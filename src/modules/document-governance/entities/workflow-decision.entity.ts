import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WorkflowAssignment } from './workflow-assignment.entity';
import { DocumentApprovalDecision } from '../enums/document-governance.enums';

/** workflow_decisions (§9.9): decisión tomada al completar una asignación de workflow. */
@Entity('workflow_decisions')
export class WorkflowDecision extends BaseAuditEntity {
  @Index()
  @Column({ name: 'assignment_id', type: 'uuid' })
  assignmentId: string;

  @ManyToOne(() => WorkflowAssignment, (assignment) => assignment.decisions)
  @JoinColumn({ name: 'assignment_id' })
  assignment: WorkflowAssignment;

  @Column({ type: 'enum', enum: DocumentApprovalDecision })
  decision: DocumentApprovalDecision;

  @Column({ type: 'text', nullable: true })
  comments: string | null;

  @Column({ name: 'decided_at', type: 'timestamp' })
  decidedAt: Date;
}
