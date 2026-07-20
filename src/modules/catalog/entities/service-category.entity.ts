import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ServiceSubcategory } from './service-subcategory.entity';

/** service_categories (§9.2 / §4.3): categorías del ecosistema logístico. */
@Entity('service_categories')
export class ServiceCategory extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => ServiceSubcategory, (subcategory) => subcategory.category)
  subcategories: ServiceSubcategory[];
}
