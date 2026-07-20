import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentTypeWorkflow } from './document-type-workflow.entity';
import { WorkflowStepAction } from '../enums/document-governance.enums';

/** workflow_steps (§9.9): pasos ordenados de un workflow documental. */
@Entity('workflow_steps')
export class WorkflowStep extends BaseAuditEntity {
  @Index()
  @Column({ name: 'workflow_id', type: 'uuid' })
  workflowId: string;

  @ManyToOne(() => DocumentTypeWorkflow, (workflow) => workflow.steps)
  @JoinColumn({ name: 'workflow_id' })
  workflow: DocumentTypeWorkflow;

  @Column({ name: 'step_order', type: 'int' })
  stepOrder: number;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'required_role', type: 'varchar', length: 100 })
  requiredRole: string;

  @Column({
    type: 'enum',
    enum: WorkflowStepAction,
    default: WorkflowStepAction.REVISAR,
  })
  action: WorkflowStepAction;
}
