import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** wms_inventory_balances (§9.6): saldo de inventario por SKU/ubicación/lote. */
@Entity('wms_inventory_balances')
export class WmsInventoryBalance extends BaseAuditEntity {
  @Index()
  @Column({ name: 'sku_id', type: 'uuid' })
  skuId: string;

  @Index()
  @Column({ name: 'location_id', type: 'uuid' })
  locationId: string;

  @Column({ name: 'lot_id', type: 'uuid', nullable: true })
  lotId: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  quantity: string;

  @Column({
    name: 'reserved_quantity',
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: 0,
  })
  reservedQuantity: string;
}
