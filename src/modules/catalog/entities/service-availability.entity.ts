import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { LogisticsService } from './logistics-service.entity';

/** service_availability (§9.2): disponibilidad general del servicio publicado. */
@Entity('service_availability')
export class ServiceAvailability extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'logistics_service_id', type: 'uuid' })
  logisticsServiceId: string;

  @OneToOne(() => LogisticsService, (service) => service.availability)
  @JoinColumn({ name: 'logistics_service_id' })
  logisticsService: LogisticsService;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable: boolean;

  @Column({ name: 'lead_time_days', type: 'int', nullable: true })
  leadTimeDays: number | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
