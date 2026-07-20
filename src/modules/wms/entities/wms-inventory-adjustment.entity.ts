import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** wms_inventory_adjustments (§9.6 / §4.4.4 "Ajustes de inventario"). */
@Entity('wms_inventory_adjustments')
export class WmsInventoryAdjustment extends BaseAuditEntity {
  @Index()
  @Column({ name: 'sku_id', type: 'uuid' })
  skuId: string;

  @Column({ name: 'location_id', type: 'uuid' })
  locationId: string;

  @Column({ name: 'quantity_delta', type: 'decimal', precision: 14, scale: 3 })
  quantityDelta: string;

  @Column({ type: 'varchar', length: 300 })
  reason: string;

  @Column({ name: 'adjusted_by', type: 'uuid' })
  adjustedBy: string;
}
