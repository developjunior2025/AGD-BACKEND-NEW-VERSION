import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { LogisticsService } from './logistics-service.entity';

/** service_deliverables (§9.2): entregables del servicio. */
@Entity('service_deliverables')
export class ServiceDeliverable extends BaseAuditEntity {
  @Index()
  @Column({ name: 'logistics_service_id', type: 'uuid' })
  logisticsServiceId: string;

  @ManyToOne(() => LogisticsService, (service) => service.deliverables)
  @JoinColumn({ name: 'logistics_service_id' })
  logisticsService: LogisticsService;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
