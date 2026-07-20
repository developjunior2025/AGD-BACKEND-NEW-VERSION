import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { InspectionStatus } from '../enums/customs.enums';
import { CustomsInspectionResult } from './customs-inspection-result.entity';

/** customs_inspections (§9.3): inspección física derivada de canal amarillo/rojo. */
@Entity('customs_inspections')
export class CustomsInspection extends BaseAuditEntity {
  @Index()
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @Column({ name: 'scheduled_at', type: 'timestamp', nullable: true })
  scheduledAt: Date | null;

  @Column({ name: 'performed_at', type: 'timestamp', nullable: true })
  performedAt: Date | null;

  @Column({ name: 'inspector_id', type: 'uuid', nullable: true })
  inspectorId: string | null;

  @Column({
    type: 'enum',
    enum: InspectionStatus,
    default: InspectionStatus.PROGRAMADA,
  })
  status: InspectionStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @OneToMany(() => CustomsInspectionResult, (result) => result.inspection)
  results: CustomsInspectionResult[];
}
