import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { UseCase } from './use-case.entity';

/** use_case_rules (§9.11 / §7.8 "Reglas de negocio"). */
@Entity('use_case_rules')
export class UseCaseRule extends BaseAuditEntity {
  @Index()
  @Column({ name: 'use_case_id', type: 'uuid' })
  useCaseId: string;

  @ManyToOne(() => UseCase, (useCase) => useCase.rules)
  @JoinColumn({ name: 'use_case_id' })
  useCase: UseCase;

  @Column({ type: 'text' })
  description: string;
}
