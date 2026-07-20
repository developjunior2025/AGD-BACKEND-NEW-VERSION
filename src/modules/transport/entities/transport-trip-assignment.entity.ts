import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportTrip } from './transport-trip.entity';

/** transport_trip_assignments (§9.7): historial de asignación de unidad/conductor a un viaje. */
@Entity('transport_trip_assignments')
export class TransportTripAssignment extends BaseAuditEntity {
  @Index()
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @ManyToOne(() => TransportTrip, (trip) => trip.assignments)
  @JoinColumn({ name: 'trip_id' })
  trip: TransportTrip;

  @Column({ name: 'vehicle_id', type: 'uuid' })
  vehicleId: string;

  @Column({ name: 'driver_id', type: 'uuid' })
  driverId: string;

  @Column({ name: 'assigned_by', type: 'uuid' })
  assignedBy: string;

  @Column({ name: 'assigned_at', type: 'timestamp' })
  assignedAt: Date;
}
