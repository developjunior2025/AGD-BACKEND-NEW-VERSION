import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** business_rule_catalog (§9.11): reglas de negocio del documento de reglas (§10) indexadas. */
@Entity('business_rule_catalog')
export class BusinessRuleCatalog extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'rule_category',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  ruleCategory: string | null;

  @Column({ name: 'related_module_id', type: 'uuid', nullable: true })
  relatedModuleId: string | null;
}
