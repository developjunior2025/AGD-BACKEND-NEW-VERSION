import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportOrder } from './transport-order.entity';
import { TripStatus } from '../enums/transport.enums';
import { TransportTripAssignment } from './transport-trip-assignment.entity';
import { TransportRoute } from './transport-route.entity';
import { TransportMilestone } from './transport-milestone.entity';
import { TransportIncident } from './transport-incident.entity';
import { TransportProofOfDelivery } from './transport-proof-of-delivery.entity';
import { TransportTripSettlement } from './transport-trip-settlement.entity';
import { TransportOperationClosure } from './transport-operation-closure.entity';

/** transport_trips (§9.7 / §4.4.5 "Bitácora de viaje"). */
@Entity('transport_trips')
export class TransportTrip extends BaseAuditEntity {
  @Index()
  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string;

  @ManyToOne(() => TransportOrder, (order) => order.trips)
  @JoinColumn({ name: 'order_id' })
  order: TransportOrder;

  @Column({ name: 'vehicle_id', type: 'uuid', nullable: true })
  vehicleId: string | null;

  @Column({ name: 'driver_id', type: 'uuid', nullable: true })
  driverId: string | null;

  @Column({ type: 'enum', enum: TripStatus, default: TripStatus.PROGRAMADO })
  status: TripStatus;

  @Column({ name: 'started_at', type: 'timestamp', nullable: true })
  startedAt: Date | null;

  @Column({ name: 'ended_at', type: 'timestamp', nullable: true })
  endedAt: Date | null;

  @OneToMany(() => TransportTripAssignment, (assignment) => assignment.trip)
  assignments: TransportTripAssignment[];

  @OneToOne(() => TransportRoute, (route) => route.trip)
  route: TransportRoute;

  @OneToMany(() => TransportMilestone, (milestone) => milestone.trip)
  milestones: TransportMilestone[];

  @OneToMany(() => TransportIncident, (incident) => incident.trip)
  incidents: TransportIncident[];

  @OneToOne(() => TransportProofOfDelivery, (pod) => pod.trip)
  proofOfDelivery: TransportProofOfDelivery;

  @OneToOne(() => TransportTripSettlement, (settlement) => settlement.trip)
  settlement: TransportTripSettlement;

  @OneToOne(() => TransportOperationClosure, (closure) => closure.trip)
  closure: TransportOperationClosure;
}
