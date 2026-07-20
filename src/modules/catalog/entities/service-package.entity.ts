import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { LogisticsService } from './logistics-service.entity';

/** service_packages (§9.2): paquetes/combos de servicios. */
@Entity('service_packages')
export class ServicePackage extends BaseAuditEntity {
  @Index()
  @Column({ name: 'logistics_service_id', type: 'uuid' })
  logisticsServiceId: string;

  @ManyToOne(() => LogisticsService, (service) => service.packages)
  @JoinColumn({ name: 'logistics_service_id' })
  logisticsService: LogisticsService;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  price: string | null;
}
