import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** customs_release_authorizations (§9.3 / §4.4.1 "Levante" y "Constancia de liberación"). */
@Entity('customs_release_authorizations')
export class CustomsReleaseAuthorization extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @Column({ name: 'authorized_by', type: 'uuid' })
  authorizedBy: string;

  @Column({ name: 'authorized_at', type: 'timestamp' })
  authorizedAt: Date;

  @Column({ name: 'release_number', type: 'varchar', length: 100 })
  releaseNumber: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
