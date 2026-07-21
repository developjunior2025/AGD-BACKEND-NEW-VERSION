import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { SessionStatus } from '../enums/admin.enums';

/** session_logs (§9.11 / §6.10 "Sesiones"). */
@Entity('session_logs')
export class SessionLog extends BaseAuditEntity {
  @Index()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'ip_address', type: 'varchar', length: 100, nullable: true })
  ipAddress: string | null;

  @Column({ name: 'user_agent', type: 'varchar', length: 500, nullable: true })
  userAgent: string | null;

  @Column({ name: 'login_at', type: 'timestamp' })
  loginAt: Date;

  @Column({ name: 'logout_at', type: 'timestamp', nullable: true })
  logoutAt: Date | null;

  @Column({ type: 'enum', enum: SessionStatus, default: SessionStatus.ACTIVA })
  status: SessionStatus;
}
