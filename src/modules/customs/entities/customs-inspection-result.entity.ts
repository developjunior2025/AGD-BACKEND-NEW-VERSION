import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CustomsInspection } from './customs-inspection.entity';
import { InspectionResultOutcome } from '../enums/customs.enums';

/** customs_inspection_results (§9.3 / §4.4.1 "Actas de reconocimiento"). */
@Entity('customs_inspection_results')
export class CustomsInspectionResult extends BaseAuditEntity {
  @Index()
  @Column({ name: 'inspection_id', type: 'uuid' })
  inspectionId: string;

  @ManyToOne(() => CustomsInspection, (inspection) => inspection.results)
  @JoinColumn({ name: 'inspection_id' })
  inspection: CustomsInspection;

  @Column({ type: 'enum', enum: InspectionResultOutcome })
  outcome: InspectionResultOutcome;

  @Column({ type: 'text', nullable: true })
  findings: string | null;

  @Column({ name: 'acta_url', type: 'varchar', length: 500, nullable: true })
  actaUrl: string | null;
}
