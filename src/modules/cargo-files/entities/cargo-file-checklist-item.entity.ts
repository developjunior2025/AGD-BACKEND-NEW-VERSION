import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CargoFileChecklist } from './cargo-file-checklist.entity';

/** cargo_file_checklist_items (§9.9). */
@Entity('cargo_file_checklist_items')
export class CargoFileChecklistItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'checklist_id', type: 'uuid' })
  checklistId: string;

  @ManyToOne(() => CargoFileChecklist, (checklist) => checklist.items)
  @JoinColumn({ name: 'checklist_id' })
  checklist: CargoFileChecklist;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ name: 'is_required', type: 'boolean', default: true })
  isRequired: boolean;

  @Column({ name: 'is_completed', type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @Column({ name: 'document_type_id', type: 'uuid', nullable: true })
  documentTypeId: string | null;
}
