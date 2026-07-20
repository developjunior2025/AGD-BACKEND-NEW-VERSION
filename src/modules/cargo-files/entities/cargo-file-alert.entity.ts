import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CargoFile } from './cargo-file.entity';
import { AlertSeverity } from '../enums/cargo-file.enums';

/** cargo_file_alerts (§9.9, regla §10: "Los vencimientos deberán generar alertas"). */
@Entity('cargo_file_alerts')
export class CargoFileAlert extends BaseAuditEntity {
  @Index()
  @Column({ name: 'cargo_file_id', type: 'uuid' })
  cargoFileId: string;

  @ManyToOne(() => CargoFile, (cargoFile) => cargoFile.alerts)
  @JoinColumn({ name: 'cargo_file_id' })
  cargoFile: CargoFile;

  @Column({ type: 'varchar', length: 100 })
  type: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'enum', enum: AlertSeverity, default: AlertSeverity.INFO })
  severity: AlertSeverity;

  @Column({ name: 'is_resolved', type: 'boolean', default: false })
  isResolved: boolean;

  @Column({ name: 'resolved_at', type: 'timestamp', nullable: true })
  resolvedAt: Date | null;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  dueDate: Date | null;
}
