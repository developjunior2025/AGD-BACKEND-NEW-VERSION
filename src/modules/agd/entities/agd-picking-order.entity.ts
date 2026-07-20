import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PickingOrderStatus } from '../enums/agd.enums';
import { AgdDispatchOrder } from './agd-dispatch-order.entity';

/** agd_picking_orders (§9.5 / §4.4.3 "Orden de picking"). */
@Entity('agd_picking_orders')
export class AgdPickingOrder extends BaseAuditEntity {
  @Index()
  @Column({ name: 'lot_id', type: 'uuid' })
  lotId: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ name: 'requested_at', type: 'timestamp' })
  requestedAt: Date;

  @Column({
    type: 'enum',
    enum: PickingOrderStatus,
    default: PickingOrderStatus.PENDIENTE,
  })
  status: PickingOrderStatus;

  @OneToMany(
    () => AgdDispatchOrder,
    (dispatchOrder) => dispatchOrder.pickingOrder,
  )
  dispatchOrders: AgdDispatchOrder[];
}
