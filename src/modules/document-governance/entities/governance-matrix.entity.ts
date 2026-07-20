import { Column, Entity, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { GovernanceMatrixRule } from './governance-matrix-rule.entity';

/** governance_matrices (§9.9 / §4.5.3): fuente única de permisos documentales. */
@Entity('governance_matrices')
export class GovernanceMatrix extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => GovernanceMatrixRule, (rule) => rule.matrix)
  rules: GovernanceMatrixRule[];
}
