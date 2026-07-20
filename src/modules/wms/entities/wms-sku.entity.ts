import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsProduct } from './wms-product.entity';

/** wms_skus (§9.6 / §4.4.4 "Catálogo SKU / UPN"). */
@Entity('wms_skus')
export class WmsSku extends BaseAuditEntity {
  @Index()
  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @ManyToOne(() => WmsProduct, (product) => product.skus)
  @JoinColumn({ name: 'product_id' })
  product: WmsProduct;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({
    name: 'unit_of_measure',
    type: 'varchar',
    length: 50,
    default: 'unidad',
  })
  unitOfMeasure: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  barcode: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 3, nullable: true })
  weight: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
