import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { AgdPickingOrder } from './agd-picking-order.entity';
import { DispatchOrderStatus } from '../enums/agd.enums';
import { AgdDeliveryRecord } from './agd-delivery-record.entity';

/** agd_dispatch_orders (§9.5 / §4.4.3 "Orden de despacho"). */
@Entity('agd_dispatch_orders')
export class AgdDispatchOrder extends BaseAuditEntity {
  @Index()
  @Column({ name: 'picking_order_id', type: 'uuid', nullable: true })
  pickingOrderId: string | null;

  @ManyToOne(() => AgdPickingOrder, (order) => order.dispatchOrders, {
    nullable: true,
  })
  @JoinColumn({ name: 'picking_order_id' })
  pickingOrder: AgdPickingOrder | null;

  @Index()
  @Column({ name: 'lot_id', type: 'uuid' })
  lotId: string;

  @Column({ name: 'dispatched_at', type: 'timestamp', nullable: true })
  dispatchedAt: Date | null;

  @Column({
    type: 'enum',
    enum: DispatchOrderStatus,
    default: DispatchOrderStatus.PENDIENTE,
  })
  status: DispatchOrderStatus;

  @OneToOne(() => AgdDeliveryRecord, (record) => record.dispatchOrder)
  deliveryRecord: AgdDeliveryRecord;
}
