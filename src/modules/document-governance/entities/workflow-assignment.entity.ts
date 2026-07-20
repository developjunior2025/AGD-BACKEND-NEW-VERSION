import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WorkflowStep } from './workflow-step.entity';
import { WorkflowAssignmentStatus } from '../enums/document-governance.enums';
import { WorkflowDecision } from './workflow-decision.entity';

/** workflow_assignments (§9.9): asignación de un paso de workflow a un documento concreto. */
@Entity('workflow_assignments')
export class WorkflowAssignment extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_instance_id', type: 'uuid' })
  documentInstanceId: string;

  @Index()
  @Column({ name: 'workflow_step_id', type: 'uuid' })
  workflowStepId: string;

  @ManyToOne(() => WorkflowStep)
  @JoinColumn({ name: 'workflow_step_id' })
  workflowStep: WorkflowStep;

  @Column({ name: 'assignee_id', type: 'uuid' })
  assigneeId: string;

  @Column({
    type: 'enum',
    enum: WorkflowAssignmentStatus,
    default: WorkflowAssignmentStatus.PENDIENTE,
  })
  status: WorkflowAssignmentStatus;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @OneToMany(() => WorkflowDecision, (decision) => decision.assignment)
  decisions: WorkflowDecision[];
}
