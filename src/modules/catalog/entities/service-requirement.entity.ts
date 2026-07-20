import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { LogisticsService } from './logistics-service.entity';
import { ServiceRequirementType } from '../enums/service.enums';

/** service_requirements (§9.2): requisitos del cliente y documentos requeridos. */
@Entity('service_requirements')
export class ServiceRequirement extends BaseAuditEntity {
  @Index()
  @Column({ name: 'logistics_service_id', type: 'uuid' })
  logisticsServiceId: string;

  @ManyToOne(() => LogisticsService, (service) => service.requirements)
  @JoinColumn({ name: 'logistics_service_id' })
  logisticsService: LogisticsService;

  @Column({ type: 'enum', enum: ServiceRequirementType })
  type: ServiceRequirementType;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
