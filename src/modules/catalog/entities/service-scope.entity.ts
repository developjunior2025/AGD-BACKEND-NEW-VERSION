import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { LogisticsService } from './logistics-service.entity';

/** service_scopes (§9.2 / §5.4 "Alcance", actividades incluidas/no incluidas). */
@Entity('service_scopes')
export class ServiceScope extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'logistics_service_id', type: 'uuid' })
  logisticsServiceId: string;

  @OneToOne(() => LogisticsService, (service) => service.scope)
  @JoinColumn({ name: 'logistics_service_id' })
  logisticsService: LogisticsService;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'included_activities', type: 'json', nullable: true })
  includedActivities: string[] | null;

  @Column({ name: 'excluded_activities', type: 'json', nullable: true })
  excludedActivities: string[] | null;
}
