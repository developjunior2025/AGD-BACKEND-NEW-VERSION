import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportTrip } from './transport-trip.entity';
import { IncidentSeverity, IncidentStatus } from '../enums/transport.enums';

/** transport_incidents (§9.7 / §4.4.5 "Reporte de incidencias"). */
@Entity('transport_incidents')
export class TransportIncident extends BaseAuditEntity {
  @Index()
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @ManyToOne(() => TransportTrip, (trip) => trip.incidents)
  @JoinColumn({ name: 'trip_id' })
  trip: TransportTrip;

  @Column({ name: 'incident_type', type: 'varchar', length: 100 })
  incidentType: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'occurred_at', type: 'timestamp' })
  occurredAt: Date;

  @Column({
    type: 'enum',
    enum: IncidentSeverity,
    default: IncidentSeverity.BAJA,
  })
  severity: IncidentSeverity;

  @Column({
    name: 'resolved_status',
    type: 'enum',
    enum: IncidentStatus,
    default: IncidentStatus.PENDIENTE,
  })
  resolvedStatus: IncidentStatus;
}
