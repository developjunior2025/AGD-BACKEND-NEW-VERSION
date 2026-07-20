import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortDischargeOrder } from './port-discharge-order.entity';

/** port_discharge_events (§9.4 / §4.4.2 "Parte de descarga"). */
@Entity('port_discharge_events')
export class PortDischargeEvent extends BaseAuditEntity {
  @Index()
  @Column({ name: 'discharge_order_id', type: 'uuid' })
  dischargeOrderId: string;

  @ManyToOne(() => PortDischargeOrder, (order) => order.events)
  @JoinColumn({ name: 'discharge_order_id' })
  dischargeOrder: PortDischargeOrder;

  @Column({ name: 'container_id', type: 'uuid', nullable: true })
  containerId: string | null;

  @Column({ name: 'event_at', type: 'timestamp' })
  eventAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
