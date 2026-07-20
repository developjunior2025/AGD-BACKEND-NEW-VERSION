import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsPackingOrder } from './wms-packing-order.entity';
import { DispatchOrderStatus } from '../enums/wms.enums';
import { WmsDispatchEvidence } from './wms-dispatch-evidence.entity';

/** wms_dispatch_orders (§9.6 / §4.4.4 "Orden de despacho" y "Checklist de despacho"). */
@Entity('wms_dispatch_orders')
export class WmsDispatchOrder extends BaseAuditEntity {
  @Index()
  @Column({ name: 'packing_order_id', type: 'uuid', nullable: true })
  packingOrderId: string | null;

  @ManyToOne(() => WmsPackingOrder, (order) => order.dispatchOrders, {
    nullable: true,
  })
  @JoinColumn({ name: 'packing_order_id' })
  packingOrder: WmsPackingOrder | null;

  @Index({ unique: true })
  @Column({ name: 'dispatch_number', type: 'varchar', length: 100 })
  dispatchNumber: string;

  @Column({ name: 'checklist_completed', type: 'boolean', default: false })
  checklistCompleted: boolean;

  @Column({ name: 'dispatched_at', type: 'timestamp', nullable: true })
  dispatchedAt: Date | null;

  @Column({
    type: 'enum',
    enum: DispatchOrderStatus,
    default: DispatchOrderStatus.PENDIENTE,
  })
  status: DispatchOrderStatus;

  @OneToMany(() => WmsDispatchEvidence, (evidence) => evidence.dispatchOrder)
  evidence: WmsDispatchEvidence[];
}
