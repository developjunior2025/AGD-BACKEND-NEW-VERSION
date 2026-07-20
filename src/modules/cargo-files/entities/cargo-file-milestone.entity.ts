import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CargoFile } from './cargo-file.entity';
import { CargoMilestoneStatus } from '../enums/cargo-file.enums';

/** cargo_file_milestones (§9.9): hitos operativos del expediente. */
@Entity('cargo_file_milestones')
export class CargoFileMilestone extends BaseAuditEntity {
  @Index()
  @Column({ name: 'cargo_file_id', type: 'uuid' })
  cargoFileId: string;

  @ManyToOne(() => CargoFile, (cargoFile) => cargoFile.milestones)
  @JoinColumn({ name: 'cargo_file_id' })
  cargoFile: CargoFile;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'planned_at', type: 'timestamp', nullable: true })
  plannedAt: Date | null;

  @Column({ name: 'occurred_at', type: 'timestamp', nullable: true })
  occurredAt: Date | null;

  @Column({
    type: 'enum',
    enum: CargoMilestoneStatus,
    default: CargoMilestoneStatus.PENDIENTE,
  })
  status: CargoMilestoneStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
