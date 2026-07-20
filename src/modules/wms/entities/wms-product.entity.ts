import { Column, Entity, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsSku } from './wms-sku.entity';

/** wms_products (§9.6 / §4.4.4 "Productos"). */
@Entity('wms_products')
export class WmsProduct extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  brand: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  category: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => WmsSku, (sku) => sku.product)
  skus: WmsSku[];
}
