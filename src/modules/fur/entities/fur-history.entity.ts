import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurRecord } from './fur-record.entity';

/**
 * Historial de cambios de estado/contenido de un FUR (§7 "Historial de
 * cambios"), distinto de fur_versions: aquí se registra el tipo de cambio
 * (ej. cambio de estado) y no un snapshot completo del contenido.
 */
@Entity('fur_history')
export class FurHistory extends BaseAuditEntity {
  @Index()
  @Column({ name: 'fur_record_id', type: 'uuid' })
  furRecordId: string;

  @ManyToOne(() => FurRecord)
  @JoinColumn({ name: 'fur_record_id' })
  furRecord: FurRecord;

  @Column({ name: 'change_type', type: 'varchar', length: 100 })
  changeType: string;

  @Column({ name: 'previous_state', type: 'json', nullable: true })
  previousState: Record<string, unknown> | null;

  @Column({ name: 'new_state', type: 'json', nullable: true })
  newState: Record<string, unknown> | null;

  @Column({ name: 'changed_by', type: 'uuid', nullable: true })
  changedBy: string | null;
}
