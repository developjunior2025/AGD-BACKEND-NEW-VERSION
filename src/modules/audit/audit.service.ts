import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { ImmutableAuditEvent } from './entities/immutable-audit-event.entity';

export interface RecordAuditLogInput {
  actorId: string | null;
  actorEmail: string | null;
  method: string;
  path: string;
  action: string;
  statusCode: number;
  ipAddress: string | null;
  userAgent: string | null;
  metadata?: Record<string, unknown> | null;
}

export interface RecordCriticalEventInput {
  actorId: string | null;
  actorProfileType: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  beforeState?: Record<string, unknown> | null;
  afterState?: Record<string, unknown> | null;
  reason?: string | null;
}

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    @InjectRepository(ImmutableAuditEvent)
    private readonly immutableAuditEventRepository: Repository<ImmutableAuditEvent>,
  ) {}

  async log(input: RecordAuditLogInput): Promise<void> {
    const entry = this.auditLogRepository.create({
      ...input,
      metadata: input.metadata ?? null,
    });
    await this.auditLogRepository.save(entry);
  }

  /** Registra una acción crítica de forma inmutable (solo inserción). */
  async logCritical(input: RecordCriticalEventInput): Promise<void> {
    const entry = this.immutableAuditEventRepository.create({
      ...input,
      beforeState: input.beforeState ?? null,
      afterState: input.afterState ?? null,
      reason: input.reason ?? null,
    });
    await this.immutableAuditEventRepository.save(entry);
  }
}
