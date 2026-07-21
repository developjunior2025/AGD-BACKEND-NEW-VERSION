import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { UseCaseStep } from './use-case-step.entity';
import { UseCaseRule } from './use-case-rule.entity';

/** use_cases (§9.11 / §7.8 FUR de casos de uso). */
@Entity('use_cases')
export class UseCase extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'module_id', type: 'uuid', nullable: true })
  moduleId: string | null;

  @Column({ name: 'primary_actor', type: 'varchar', length: 150 })
  primaryActor: string;

  @Column({ name: 'secondary_actors', type: 'json', nullable: true })
  secondaryActors: string[] | null;

  @Column({ type: 'text' })
  objective: string;

  @Column({ type: 'text', nullable: true })
  preconditions: string | null;

  @Column({ type: 'text', nullable: true })
  trigger: string | null;

  @Column({ type: 'text', nullable: true })
  postconditions: string | null;

  @OneToMany(() => UseCaseStep, (step) => step.useCase)
  steps: UseCaseStep[];

  @OneToMany(() => UseCaseRule, (rule) => rule.useCase)
  rules: UseCaseRule[];
}
