import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentInstance } from './document-instance.entity';
import { DocumentObservationStatus } from '../enums/document-governance.enums';
import { DocumentRemediation } from './document-remediation.entity';

/** document_observations (§9.9 / §4.5.2). */
@Entity('document_observations')
export class DocumentObservation extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_instance_id', type: 'uuid' })
  documentInstanceId: string;

  @ManyToOne(() => DocumentInstance, (instance) => instance.observations)
  @JoinColumn({ name: 'document_instance_id' })
  documentInstance: DocumentInstance;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @Column({ type: 'text' })
  observation: string;

  @Column({
    type: 'enum',
    enum: DocumentObservationStatus,
    default: DocumentObservationStatus.ABIERTA,
  })
  status: DocumentObservationStatus;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt: Date | null;

  @OneToMany(
    () => DocumentRemediation,
    (remediation) => remediation.observation,
  )
  remediations: DocumentRemediation[];
}
