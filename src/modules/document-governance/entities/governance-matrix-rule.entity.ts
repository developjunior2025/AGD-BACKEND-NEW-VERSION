import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { GovernanceMatrix } from './governance-matrix.entity';
import {
  GovernanceAccessLevel,
  GovernanceAction,
} from '../enums/document-governance.enums';

/** governance_matrix_rules (§9.9 / §4.5.3): reglas perfil × tipo documental × acción. */
@Entity('governance_matrix_rules')
export class GovernanceMatrixRule extends BaseAuditEntity {
  @Index()
  @Column({ name: 'matrix_id', type: 'uuid' })
  matrixId: string;

  @ManyToOne(() => GovernanceMatrix, (matrix) => matrix.rules)
  @JoinColumn({ name: 'matrix_id' })
  matrix: GovernanceMatrix;

  @Index()
  @Column({ name: 'profile_type', type: 'varchar', length: 100 })
  profileType: string;

  @Column({ name: 'document_type_id', type: 'uuid', nullable: true })
  documentTypeId: string | null;

  @Column({ type: 'enum', enum: GovernanceAction })
  action: GovernanceAction;

  @Column({ name: 'access_level', type: 'enum', enum: GovernanceAccessLevel })
  accessLevel: GovernanceAccessLevel;

  @Column({ type: 'text', nullable: true })
  conditions: string | null;
}
