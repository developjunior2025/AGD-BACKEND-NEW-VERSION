import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortVoyage } from './port-voyage.entity';
import { ManifestStatus } from '../enums/port.enums';
import { PortManifestItem } from './port-manifest-item.entity';

/** port_manifests (§9.4 / §4.4.2 "Manifiesto de carga"). */
@Entity('port_manifests')
export class PortManifest extends BaseAuditEntity {
  @Index()
  @Column({ name: 'voyage_id', type: 'uuid' })
  voyageId: string;

  @ManyToOne(() => PortVoyage, (voyage) => voyage.manifests)
  @JoinColumn({ name: 'voyage_id' })
  voyage: PortVoyage;

  @Column({ name: 'manifest_number', type: 'varchar', length: 100 })
  manifestNumber: string;

  @Column({ name: 'submitted_at', type: 'timestamp' })
  submittedAt: Date;

  @Column({
    type: 'enum',
    enum: ManifestStatus,
    default: ManifestStatus.PRESENTADO,
  })
  status: ManifestStatus;

  @OneToMany(() => PortManifestItem, (item) => item.manifest)
  items: PortManifestItem[];
}
