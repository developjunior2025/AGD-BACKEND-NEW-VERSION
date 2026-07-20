import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CargoFile } from './cargo-file.entity';
import { CargoFileChecklistItem } from './cargo-file-checklist-item.entity';

/**
 * cargo_file_checklists (§9.9, regla §10: "Los checklists deberán
 * configurarse por tipo de carga, régimen y operación").
 */
@Entity('cargo_file_checklists')
export class CargoFileChecklist extends BaseAuditEntity {
  @Index()
  @Column({ name: 'cargo_file_id', type: 'uuid' })
  cargoFileId: string;

  @ManyToOne(() => CargoFile, (cargoFile) => cargoFile.checklists)
  @JoinColumn({ name: 'cargo_file_id' })
  cargoFile: CargoFile;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @OneToMany(() => CargoFileChecklistItem, (item) => item.checklist)
  items: CargoFileChecklistItem[];
}
