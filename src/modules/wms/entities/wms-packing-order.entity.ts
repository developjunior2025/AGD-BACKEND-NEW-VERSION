import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsPickingOrder } from './wms-picking-order.entity';
import { OrderStatus } from '../enums/wms.enums';
import { WmsDispatchOrder } from './wms-dispatch-order.entity';

/** wms_packing_orders (§9.6 / §4.4.4 "Packing" y "Consolidación"). */
@Entity('wms_packing_orders')
export class WmsPackingOrder extends BaseAuditEntity {
  @Index()
  @Column({ name: 'picking_order_id', type: 'uuid' })
  pickingOrderId: string;

  @ManyToOne(() => WmsPickingOrder, (order) => order.packingOrders)
  @JoinColumn({ name: 'picking_order_id' })
  pickingOrder: WmsPickingOrder;

  @Column({ name: 'packed_by', type: 'uuid', nullable: true })
  packedBy: string | null;

  @Column({ name: 'packed_at', type: 'timestamp', nullable: true })
  packedAt: Date | null;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDIENTE })
  status: OrderStatus;

  @OneToMany(() => WmsDispatchOrder, (order) => order.packingOrder)
  dispatchOrders: WmsDispatchOrder[];
}
