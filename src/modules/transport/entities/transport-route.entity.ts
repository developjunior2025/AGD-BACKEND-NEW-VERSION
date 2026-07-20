import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportTrip } from './transport-trip.entity';
import { TransportRouteStop } from './transport-route-stop.entity';

/** transport_routes (§9.7 / §4.4.5 "Hoja de ruta"). */
@Entity('transport_routes')
export class TransportRoute extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @OneToOne(() => TransportTrip, (trip) => trip.route)
  @JoinColumn({ name: 'trip_id' })
  trip: TransportTrip;

  @Column({ type: 'varchar', length: 200, nullable: true })
  name: string | null;

  @OneToMany(() => TransportRouteStop, (stop) => stop.route)
  stops: TransportRouteStop[];
}
