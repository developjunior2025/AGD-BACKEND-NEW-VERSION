import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentInstance } from './document-instance.entity';

/** document_versions (§9.9, regla §10: "Cada documento deberá conservar su historial de versiones"). */
@Entity('document_versions')
export class DocumentVersion extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_instance_id', type: 'uuid' })
  documentInstanceId: string;

  @ManyToOne(() => DocumentInstance, (instance) => instance.versions)
  @JoinColumn({ name: 'document_instance_id' })
  documentInstance: DocumentInstance;

  @Column({ name: 'version_number', type: 'int' })
  versionNumber: number;

  @Column({ type: 'json', nullable: true })
  snapshot: Record<string, unknown> | null;

  @Column({ name: 'file_url', type: 'varchar', length: 500, nullable: true })
  fileUrl: string | null;

  @Column({ name: 'change_summary', type: 'text', nullable: true })
  changeSummary: string | null;
}
