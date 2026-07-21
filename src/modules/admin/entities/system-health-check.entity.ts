import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { HealthCheckStatus } from '../enums/admin.enums';

/** system_health_checks (§9.11 / §6.10 "Salud del sistema"). */
@Entity('system_health_checks')
export class SystemHealthCheck extends BaseAuditEntity {
  @Index()
  @Column({ type: 'varchar', length: 100 })
  component: string;

  @Column({ type: 'enum', enum: HealthCheckStatus })
  status: HealthCheckStatus;

  @Column({ name: 'checked_at', type: 'timestamp' })
  checkedAt: Date;

  @Column({ type: 'text', nullable: true })
  details: string | null;
}
