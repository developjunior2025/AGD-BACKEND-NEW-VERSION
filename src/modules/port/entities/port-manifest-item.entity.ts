import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortManifest } from './port-manifest.entity';

/** port_manifest_items (§9.4 / §4.4.2 "Lista de contenedores"). */
@Entity('port_manifest_items')
export class PortManifestItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'manifest_id', type: 'uuid' })
  manifestId: string;

  @ManyToOne(() => PortManifest, (manifest) => manifest.items)
  @JoinColumn({ name: 'manifest_id' })
  manifest: PortManifest;

  @Column({
    name: 'container_number',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  containerNumber: string | null;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'decimal', precision: 14, scale: 3, nullable: true })
  weight: string | null;

  @Column({ name: 'cargo_file_id', type: 'uuid', nullable: true })
  cargoFileId: string | null;
}
