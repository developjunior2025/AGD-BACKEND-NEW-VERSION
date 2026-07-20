import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** agd_release_authorizations (§9.5 / §4.4.3 "Autorización de retiro"). */
@Entity('agd_release_authorizations')
export class AgdReleaseAuthorization extends BaseAuditEntity {
  @Index()
  @Column({ name: 'lot_id', type: 'uuid' })
  lotId: string;

  @Column({ name: 'authorized_by', type: 'uuid' })
  authorizedBy: string;

  @Column({ name: 'authorized_at', type: 'timestamp' })
  authorizedAt: Date;

  @Column({ name: 'release_number', type: 'varchar', length: 100 })
  releaseNumber: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
