import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurStatus } from '../../fur/enums/fur-status.enum';
import { DocumentType } from './document-type.entity';
import { DocumentTemplateField } from './document-template-field.entity';
import { DocumentTemplateRule } from './document-template-rule.entity';

/**
 * document_templates (§9.9 / §4.5.1 "Diseñador de plantillas"). Reutiliza
 * FurStatus porque el documento de reglas define exactamente los mismos
 * estados (borrador/en_revision/aprobado/publicado/obsoleto) para plantillas.
 */
@Entity('document_templates')
export class DocumentTemplate extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_type_id', type: 'uuid' })
  documentTypeId: string;

  @ManyToOne(() => DocumentType, (type) => type.templates)
  @JoinColumn({ name: 'document_type_id' })
  documentType: DocumentType;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'enum', enum: FurStatus, default: FurStatus.BORRADOR })
  status: FurStatus;

  @Column({ type: 'varchar', length: 50, nullable: true })
  format: string | null;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  @OneToMany(() => DocumentTemplateField, (field) => field.template)
  fields: DocumentTemplateField[];

  @OneToMany(() => DocumentTemplateRule, (rule) => rule.template)
  rules: DocumentTemplateRule[];
}
