import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CargoFile } from './cargo-file.entity';

/** cargo_file_parties (§9.9): actores involucrados en el expediente. */
@Entity('cargo_file_parties')
export class CargoFileParty extends BaseAuditEntity {
  @Index()
  @Column({ name: 'cargo_file_id', type: 'uuid' })
  cargoFileId: string;

  @ManyToOne(() => CargoFile, (cargoFile) => cargoFile.parties)
  @JoinColumn({ name: 'cargo_file_id' })
  cargoFile: CargoFile;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string | null;

  @Column({ name: 'organization_id', type: 'uuid', nullable: true })
  organizationId: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name: string | null;
}
