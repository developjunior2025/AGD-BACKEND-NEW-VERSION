import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurRecord } from './fur-record.entity';

/** Snapshot versionado de un FUR (§7 "Versión", regla §10: versionamiento obligatorio). */
@Entity('fur_versions')
export class FurVersion extends BaseAuditEntity {
  @Index()
  @Column({ name: 'fur_record_id', type: 'uuid' })
  furRecordId: string;

  @ManyToOne(() => FurRecord, (record) => record.versions)
  @JoinColumn({ name: 'fur_record_id' })
  furRecord: FurRecord;

  @Column({ name: 'version_number', type: 'int' })
  versionNumber: number;

  @Column({ type: 'json' })
  snapshot: Record<string, unknown>;

  @Column({ name: 'change_summary', type: 'text', nullable: true })
  changeSummary: string | null;
}
