import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentTemplate } from './document-template.entity';

/** document_template_rules (§9.9 / §4.5.1 "Reglas de obligatoriedad, dependencias, validaciones, relaciones"). */
@Entity('document_template_rules')
export class DocumentTemplateRule extends BaseAuditEntity {
  @Index()
  @Column({ name: 'template_id', type: 'uuid' })
  templateId: string;

  @ManyToOne(() => DocumentTemplate, (template) => template.rules)
  @JoinColumn({ name: 'template_id' })
  template: DocumentTemplate;

  @Column({ name: 'rule_type', type: 'varchar', length: 50 })
  ruleType: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', nullable: true })
  config: Record<string, unknown> | null;
}
