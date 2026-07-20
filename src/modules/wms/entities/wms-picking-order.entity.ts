import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { OrderStatus } from '../enums/wms.enums';
import { WmsPackingOrder } from './wms-packing-order.entity';

/** wms_picking_orders (§9.6 / §4.4.4 "Orden de picking"). */
@Entity('wms_picking_orders')
export class WmsPickingOrder extends BaseAuditEntity {
  @Index()
  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ name: 'requested_at', type: 'timestamp' })
  requestedAt: Date;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDIENTE })
  status: OrderStatus;

  @OneToMany(() => WmsPackingOrder, (order) => order.pickingOrder)
  packingOrders: WmsPackingOrder[];
}
