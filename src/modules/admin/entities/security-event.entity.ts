import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { SecurityEventSeverity } from '../enums/admin.enums';

/** security_events (§9.11 / §6.10 "Seguridad"). */
@Entity('security_events')
export class SecurityEvent extends BaseAuditEntity {
  @Index()
  @Column({ name: 'event_type', type: 'varchar', length: 100 })
  eventType: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string | null;

  @Column({ name: 'ip_address', type: 'varchar', length: 100, nullable: true })
  ipAddress: string | null;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: SecurityEventSeverity,
    default: SecurityEventSeverity.INFO,
  })
  severity: SecurityEventSeverity;

  @Column({ name: 'occurred_at', type: 'timestamp' })
  occurredAt: Date;
}
