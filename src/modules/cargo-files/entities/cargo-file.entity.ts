import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import {
  CargoFileStatus,
  CargoOperationType,
  CargoType,
} from '../enums/cargo-file.enums';
import { CargoFileParty } from './cargo-file-party.entity';
import { CargoFileDocument } from './cargo-file-document.entity';
import { CargoFileChecklist } from './cargo-file-checklist.entity';
import { CargoFileMilestone } from './cargo-file-milestone.entity';
import { CargoFileAlert } from './cargo-file-alert.entity';

/**
 * cargo_files (§9.9 / §4.5.2): expediente único por carga — eje central que
 * los dominios operativos (aduana, puerto, AGD, WMS, transporte) referencian.
 */
@Entity('cargo_files')
export class CargoFile extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Index()
  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'agent_id', type: 'uuid', nullable: true })
  agentId: string | null;

  @Column({ name: 'cargo_type', type: 'enum', enum: CargoType })
  cargoType: CargoType;

  @Column({ name: 'operation_type', type: 'enum', enum: CargoOperationType })
  operationType: CargoOperationType;

  @Column({ type: 'varchar', length: 100, nullable: true })
  regime: string | null;

  @Column({
    name: 'origin_country',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  originCountry: string | null;

  @Column({
    name: 'destination_country',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  destinationCountry: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: CargoFileStatus,
    default: CargoFileStatus.RECIBIDO,
  })
  status: CargoFileStatus;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt: Date | null;

  @OneToMany(() => CargoFileParty, (party) => party.cargoFile)
  parties: CargoFileParty[];

  @OneToMany(() => CargoFileDocument, (document) => document.cargoFile)
  documents: CargoFileDocument[];

  @OneToMany(() => CargoFileChecklist, (checklist) => checklist.cargoFile)
  checklists: CargoFileChecklist[];

  @OneToMany(() => CargoFileMilestone, (milestone) => milestone.cargoFile)
  milestones: CargoFileMilestone[];

  @OneToMany(() => CargoFileAlert, (alert) => alert.cargoFile)
  alerts: CargoFileAlert[];
}
