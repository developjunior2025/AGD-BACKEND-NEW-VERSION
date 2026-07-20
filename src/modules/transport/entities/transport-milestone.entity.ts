import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportTrip } from './transport-trip.entity';
import { TripMilestoneStatus } from '../enums/transport.enums';

/** transport_milestones (§9.7 / §4.4.5 "Hitos de ruta"). */
@Entity('transport_milestones')
export class TransportMilestone extends BaseAuditEntity {
  @Index()
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @ManyToOne(() => TransportTrip, (trip) => trip.milestones)
  @JoinColumn({ name: 'trip_id' })
  trip: TransportTrip;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'planned_at', type: 'timestamp', nullable: true })
  plannedAt: Date | null;

  @Column({ name: 'occurred_at', type: 'timestamp', nullable: true })
  occurredAt: Date | null;

  @Column({
    type: 'enum',
    enum: TripMilestoneStatus,
    default: TripMilestoneStatus.PENDIENTE,
  })
  status: TripMilestoneStatus;
}
