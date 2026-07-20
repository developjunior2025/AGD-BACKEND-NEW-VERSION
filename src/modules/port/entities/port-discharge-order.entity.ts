import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DischargeOrderStatus } from '../enums/port.enums';
import { PortDischargeEvent } from './port-discharge-event.entity';

/** port_discharge_orders (§9.4 / §4.4.2 "Orden de descarga"). */
@Entity('port_discharge_orders')
export class PortDischargeOrder extends BaseAuditEntity {
  @Index()
  @Column({ name: 'manifest_id', type: 'uuid' })
  manifestId: string;

  @Column({ name: 'ordered_at', type: 'timestamp' })
  orderedAt: Date;

  @Column({
    type: 'enum',
    enum: DischargeOrderStatus,
    default: DischargeOrderStatus.PENDIENTE,
  })
  status: DischargeOrderStatus;

  @OneToMany(() => PortDischargeEvent, (event) => event.dischargeOrder)
  events: PortDischargeEvent[];
}
