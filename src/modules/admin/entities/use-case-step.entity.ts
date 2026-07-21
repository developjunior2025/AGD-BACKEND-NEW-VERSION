import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { UseCase } from './use-case.entity';
import { UseCaseFlowType } from '../enums/admin.enums';

/** use_case_steps (§9.11 / §7.8 "Flujo principal" y "Flujos alternativos"). */
@Entity('use_case_steps')
export class UseCaseStep extends BaseAuditEntity {
  @Index()
  @Column({ name: 'use_case_id', type: 'uuid' })
  useCaseId: string;

  @ManyToOne(() => UseCase, (useCase) => useCase.steps)
  @JoinColumn({ name: 'use_case_id' })
  useCase: UseCase;

  @Column({ name: 'step_order', type: 'int' })
  stepOrder: number;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'flow_type',
    type: 'enum',
    enum: UseCaseFlowType,
    default: UseCaseFlowType.PRINCIPAL,
  })
  flowType: UseCaseFlowType;
}
