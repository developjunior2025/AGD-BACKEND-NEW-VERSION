import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurRecord } from './fur-record.entity';

/** Anexo de un FUR (§7 "Anexos"), metadatos apuntando al módulo de Archivos. */
@Entity('fur_attachments')
export class FurAttachment extends BaseAuditEntity {
  @Index()
  @Column({ name: 'fur_record_id', type: 'uuid' })
  furRecordId: string;

  @ManyToOne(() => FurRecord, (record) => record.attachments)
  @JoinColumn({ name: 'fur_record_id' })
  furRecord: FurRecord;

  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  fileName: string;

  @Column({ name: 'file_path', type: 'varchar', length: 500 })
  filePath: string;

  @Column({ name: 'mime_type', type: 'varchar', length: 150, nullable: true })
  mimeType: string | null;

  @Column({ name: 'size_bytes', type: 'int', nullable: true })
  sizeBytes: number | null;

  @Column({ name: 'uploaded_by', type: 'uuid', nullable: true })
  uploadedBy: string | null;
}
