import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { AgdDispatchOrder } from './agd-dispatch-order.entity';

/** agd_delivery_records (§9.5 / §4.4.3 "Acta de entrega" y "Registro de salida"). */
@Entity('agd_delivery_records')
export class AgdDeliveryRecord extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'dispatch_order_id', type: 'uuid' })
  dispatchOrderId: string;

  @OneToOne(() => AgdDispatchOrder, (order) => order.deliveryRecord)
  @JoinColumn({ name: 'dispatch_order_id' })
  dispatchOrder: AgdDispatchOrder;

  @Column({ name: 'delivered_at', type: 'timestamp' })
  deliveredAt: Date;

  @Column({ name: 'received_by', type: 'varchar', length: 200, nullable: true })
  receivedBy: string | null;

  @Column({
    name: 'evidence_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  evidenceUrl: string | null;
}
