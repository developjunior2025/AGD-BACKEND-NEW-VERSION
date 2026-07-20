import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentTemplate } from './document-template.entity';

/** document_template_fields (§9.9 / §4.5.1 "Configuración de campos"). */
@Entity('document_template_fields')
export class DocumentTemplateField extends BaseAuditEntity {
  @Index()
  @Column({ name: 'template_id', type: 'uuid' })
  templateId: string;

  @ManyToOne(() => DocumentTemplate, (template) => template.fields)
  @JoinColumn({ name: 'template_id' })
  template: DocumentTemplate;

  @Column({ name: 'field_key', type: 'varchar', length: 150 })
  fieldKey: string;

  @Column({ name: 'field_label', type: 'varchar', length: 200 })
  fieldLabel: string;

  @Column({ name: 'field_type', type: 'varchar', length: 50, default: 'text' })
  fieldType: string;

  @Column({ name: 'is_required', type: 'boolean', default: false })
  isRequired: boolean;

  @Column({ type: 'json', nullable: true })
  options: string[] | null;

  @Column({ name: 'display_order', type: 'int', default: 0 })
  displayOrder: number;
}
