import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortArrival } from './port-arrival.entity';
import { BerthRequestStatus } from '../enums/port.enums';
import { PortBerthAssignment } from './port-berth-assignment.entity';

/** port_berth_requests (§9.4 / §4.4.2 "Programación de atraque"). */
@Entity('port_berth_requests')
export class PortBerthRequest extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'arrival_id', type: 'uuid' })
  arrivalId: string;

  @OneToOne(() => PortArrival, (arrival) => arrival.berthRequest)
  @JoinColumn({ name: 'arrival_id' })
  arrival: PortArrival;

  @Column({ name: 'requested_window_start', type: 'timestamp' })
  requestedWindowStart: Date;

  @Column({ name: 'requested_window_end', type: 'timestamp' })
  requestedWindowEnd: Date;

  @Column({
    type: 'enum',
    enum: BerthRequestStatus,
    default: BerthRequestStatus.PENDIENTE,
  })
  status: BerthRequestStatus;

  @OneToOne(() => PortBerthAssignment, (assignment) => assignment.berthRequest)
  assignment: PortBerthAssignment;
}
