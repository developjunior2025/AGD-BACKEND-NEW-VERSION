import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** port_release_authorizations (§9.4 / §4.4.2 "Autorización de retiro" y "Orden de entrega"). */
@Entity('port_release_authorizations')
export class PortReleaseAuthorization extends BaseAuditEntity {
  @Index()
  @Column({ name: 'container_id', type: 'uuid' })
  containerId: string;

  @Column({ name: 'authorized_by', type: 'uuid' })
  authorizedBy: string;

  @Column({ name: 'authorized_at', type: 'timestamp' })
  authorizedAt: Date;

  @Column({ name: 'release_number', type: 'varchar', length: 100 })
  releaseNumber: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
