import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ProfileType } from '../enums/profile-type.enum';
import { AuthenticatedUser } from '../types/jwt-payload.interface';

interface RequestWithUser extends Request {
  user?: AuthenticatedUser;
}

@Injectable()
export class RolesGuard {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ProfileType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user || !requiredRoles.includes(user.profileType)) {
      throw new ForbiddenException(
        'No tienes permisos para acceder a este recurso.',
      );
    }

    return true;
  }
}
