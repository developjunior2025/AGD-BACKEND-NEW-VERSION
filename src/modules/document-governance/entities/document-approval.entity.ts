import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentInstance } from './document-instance.entity';
import { DocumentApprovalDecision } from '../enums/document-governance.enums';

/** document_approvals (§9.9). */
@Entity('document_approvals')
export class DocumentApproval extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_instance_id', type: 'uuid' })
  documentInstanceId: string;

  @ManyToOne(() => DocumentInstance, (instance) => instance.approvals)
  @JoinColumn({ name: 'document_instance_id' })
  documentInstance: DocumentInstance;

  @Column({ name: 'approver_id', type: 'uuid' })
  approverId: string;

  @Column({ type: 'enum', enum: DocumentApprovalDecision })
  decision: DocumentApprovalDecision;

  @Column({ type: 'text', nullable: true })
  comments: string | null;

  @Column({ name: 'decided_at', type: 'timestamp' })
  decidedAt: Date;
}
