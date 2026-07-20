import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { LogisticsService } from './logistics-service.entity';
import { ServicePriceType } from '../enums/service.enums';

/** service_pricing (§9.2 / §5.4 "Precio fijo, referencial o cotizable"). */
@Entity('service_pricing')
export class ServicePricing extends BaseAuditEntity {
  @Index()
  @Column({ name: 'logistics_service_id', type: 'uuid' })
  logisticsServiceId: string;

  @ManyToOne(() => LogisticsService, (service) => service.pricing)
  @JoinColumn({ name: 'logistics_service_id' })
  logisticsService: LogisticsService;

  @Column({ name: 'price_type', type: 'enum', enum: ServicePriceType })
  priceType: ServicePriceType;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  amount: string | null;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  unit: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
