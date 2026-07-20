import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentTemplate } from './document-template.entity';

/** document_types (§9.9 / §4.5.1): catálogo de tipos documentales maestros. */
@Entity('document_types')
export class DocumentType extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'module_origin', type: 'varchar', length: 100 })
  moduleOrigin: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => DocumentTemplate, (template) => template.documentType)
  templates: DocumentTemplate[];
}
