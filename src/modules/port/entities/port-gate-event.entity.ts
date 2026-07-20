import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { GateEventType } from '../enums/port.enums';

/** port_gate_events (§9.4 / §4.4.2 "Gate in" y "Gate out"). */
@Entity('port_gate_events')
export class PortGateEvent extends BaseAuditEntity {
  @Index()
  @Column({ name: 'container_id', type: 'uuid' })
  containerId: string;

  @Column({ name: 'event_type', type: 'enum', enum: GateEventType })
  eventType: GateEventType;

  @Column({ name: 'occurred_at', type: 'timestamp' })
  occurredAt: Date;

  @Column({ name: 'transport_order_id', type: 'uuid', nullable: true })
  transportOrderId: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
