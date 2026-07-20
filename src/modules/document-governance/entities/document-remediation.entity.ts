import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentObservation } from './document-observation.entity';
import { RemediationStatus } from '../enums/document-governance.enums';

/**
 * document_remediations (§9.9, regla §10: "Las subsanaciones deberán
 * conservar la relación con la observación original").
 */
@Entity('document_remediations')
export class DocumentRemediation extends BaseAuditEntity {
  @Index()
  @Column({ name: 'observation_id', type: 'uuid' })
  observationId: string;

  @ManyToOne(
    () => DocumentObservation,
    (observation) => observation.remediations,
  )
  @JoinColumn({ name: 'observation_id' })
  observation: DocumentObservation;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'evidence_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  evidenceUrl: string | null;

  @Column({ name: 'submitted_by', type: 'uuid' })
  submittedBy: string;

  @Column({
    type: 'enum',
    enum: RemediationStatus,
    default: RemediationStatus.PENDIENTE,
  })
  status: RemediationStatus;
}
