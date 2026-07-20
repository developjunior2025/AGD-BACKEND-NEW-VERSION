import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WorkflowStep } from './workflow-step.entity';

/** document_type_workflows (§9.9 / §4.5.1 "Workflow de revisión" y "de aprobación"). */
@Entity('document_type_workflows')
export class DocumentTypeWorkflow extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_type_id', type: 'uuid' })
  documentTypeId: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => WorkflowStep, (step) => step.workflow)
  steps: WorkflowStep[];
}
