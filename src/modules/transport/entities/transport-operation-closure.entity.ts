import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportTrip } from './transport-trip.entity';

/** transport_operation_closures (§9.7 / §4.4.5 "Cierre operativo"). */
@Entity('transport_operation_closures')
export class TransportOperationClosure extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @OneToOne(() => TransportTrip, (trip) => trip.closure)
  @JoinColumn({ name: 'trip_id' })
  trip: TransportTrip;

  @Column({ name: 'closed_by', type: 'uuid' })
  closedBy: string;

  @Column({ name: 'closed_at', type: 'timestamp' })
  closedAt: Date;

  @Column({ type: 'text', nullable: true })
  summary: string | null;
}
