import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuditService } from '../../modules/audit/audit.service';
import { AuthenticatedUser } from '../types/jwt-payload.interface';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

interface RequestWithUser extends Request {
  user?: AuthenticatedUser;
}

/**
 * Registra en audit_logs toda petición mutante exitosa o fallida (regla §10:
 * "cada operación deberá mantener trazabilidad por usuario, fecha, estado y acción").
 * Para acciones críticas de dominio (aprobaciones, levantes, etc.) los módulos
 * de negocio deben llamar AuditService.logCritical() explícitamente.
 */
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const method = request.method;

    if (!MUTATING_METHODS.has(method)) {
      return next.handle();
    }

    const user = request.user;
    const path = request.originalUrl ?? request.url;
    const routePath = (request.route as { path?: string } | undefined)?.path;
    const action = `${method} ${routePath ?? path}`;

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse<Response>();
        void this.recordLog(
          request,
          user,
          method,
          path,
          action,
          response.statusCode,
        );
      }),
      catchError((error: { status?: number; message?: string }) => {
        const statusCode = error?.status ?? 500;
        void this.recordLog(
          request,
          user,
          method,
          path,
          action,
          statusCode,
          error?.message,
        );
        return throwError(() => error);
      }),
    );
  }

  private recordLog(
    request: Request,
    user: AuthenticatedUser | undefined,
    method: string,
    path: string,
    action: string,
    statusCode: number,
    errorMessage?: string,
  ) {
    const userAgentHeader = request.headers['user-agent'] as
      string | string[] | undefined;
    const userAgent = Array.isArray(userAgentHeader)
      ? (userAgentHeader[0] ?? null)
      : (userAgentHeader ?? null);

    return this.auditService.log({
      actorId: user?.id ?? null,
      actorEmail: user?.email ?? null,
      method,
      path,
      action,
      statusCode,
      ipAddress: request.ip ?? null,
      userAgent,
      metadata: errorMessage ? { error: errorMessage } : null,
    });
  }
}
