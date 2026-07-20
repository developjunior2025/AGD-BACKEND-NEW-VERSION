import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { InventoryMovementType } from '../enums/wms.enums';

/** wms_inventory_movements (§9.6 / §4.4.4 "Kardex"). */
@Entity('wms_inventory_movements')
export class WmsInventoryMovement extends BaseAuditEntity {
  @Index()
  @Column({ name: 'sku_id', type: 'uuid' })
  skuId: string;

  @Column({ name: 'from_location_id', type: 'uuid', nullable: true })
  fromLocationId: string | null;

  @Column({ name: 'to_location_id', type: 'uuid', nullable: true })
  toLocationId: string | null;

  @Column({ name: 'movement_type', type: 'enum', enum: InventoryMovementType })
  movementType: InventoryMovementType;

  @Column({ type: 'decimal', precision: 14, scale: 3 })
  quantity: string;

  @Column({ name: 'occurred_at', type: 'timestamp' })
  occurredAt: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  reference: string | null;
}
