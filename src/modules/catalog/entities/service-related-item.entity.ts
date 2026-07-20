import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { LogisticsService } from './logistics-service.entity';

/** service_related_items (§9.2): servicios relacionados/sugeridos. */
@Entity('service_related_items')
export class ServiceRelatedItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'logistics_service_id', type: 'uuid' })
  logisticsServiceId: string;

  @ManyToOne(() => LogisticsService)
  @JoinColumn({ name: 'logistics_service_id' })
  logisticsService: LogisticsService;

  @Index()
  @Column({ name: 'related_service_id', type: 'uuid' })
  relatedServiceId: string;

  @ManyToOne(() => LogisticsService)
  @JoinColumn({ name: 'related_service_id' })
  relatedService: LogisticsService;
}
