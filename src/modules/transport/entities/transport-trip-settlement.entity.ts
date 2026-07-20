import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportTrip } from './transport-trip.entity';
import { TripSettlementStatus } from '../enums/transport.enums';

/** transport_trip_settlements (§9.7 / §4.4.5 "Liquidación del viaje"). */
@Entity('transport_trip_settlements')
export class TransportTripSettlement extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @OneToOne(() => TransportTrip, (trip) => trip.settlement)
  @JoinColumn({ name: 'trip_id' })
  trip: TransportTrip;

  @Column({
    name: 'total_expenses',
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
  })
  totalExpenses: string;

  @Column({
    name: 'total_revenue',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  totalRevenue: string | null;

  @Column({
    name: 'net_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  netAmount: string | null;

  @Column({ name: 'settled_at', type: 'timestamp', nullable: true })
  settledAt: Date | null;

  @Column({
    type: 'enum',
    enum: TripSettlementStatus,
    default: TripSettlementStatus.PENDIENTE,
  })
  status: TripSettlementStatus;
}
