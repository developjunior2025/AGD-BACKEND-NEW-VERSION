import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ServiceCategory } from './service-category.entity';

/** service_subcategories (§9.2). */
@Entity('service_subcategories')
export class ServiceSubcategory extends BaseAuditEntity {
  @Index()
  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => ServiceCategory, (category) => category.subcategories)
  @JoinColumn({ name: 'category_id' })
  category: ServiceCategory;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
