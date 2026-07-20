import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CargoFileStatus } from '../enums/cargo-file.enums';

/** cargo_file_status_history (§9.9, regla §10: trazabilidad de estados). */
@Entity('cargo_file_status_history')
export class CargoFileStatusHistory extends BaseAuditEntity {
  @Index()
  @Column({ name: 'cargo_file_id', type: 'uuid' })
  cargoFileId: string;

  @Column({
    name: 'previous_status',
    type: 'enum',
    enum: CargoFileStatus,
    nullable: true,
  })
  previousStatus: CargoFileStatus | null;

  @Column({ name: 'new_status', type: 'enum', enum: CargoFileStatus })
  newStatus: CargoFileStatus;

  @Column({ name: 'changed_by', type: 'uuid', nullable: true })
  changedBy: string | null;

  @Column({ type: 'text', nullable: true })
  reason: string | null;
}
