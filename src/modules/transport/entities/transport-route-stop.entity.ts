import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportRoute } from './transport-route.entity';
import { RouteStopType } from '../enums/transport.enums';

/** transport_route_stops (§9.7 / §4.4.5 "Programación de retiro/entrega"). */
@Entity('transport_route_stops')
export class TransportRouteStop extends BaseAuditEntity {
  @Index()
  @Column({ name: 'route_id', type: 'uuid' })
  routeId: string;

  @ManyToOne(() => TransportRoute, (route) => route.stops)
  @JoinColumn({ name: 'route_id' })
  route: TransportRoute;

  @Column({ name: 'stop_order', type: 'int' })
  stopOrder: number;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ name: 'stop_type', type: 'enum', enum: RouteStopType })
  stopType: RouteStopType;

  @Column({ name: 'planned_at', type: 'timestamp', nullable: true })
  plannedAt: Date | null;

  @Column({ name: 'actual_at', type: 'timestamp', nullable: true })
  actualAt: Date | null;
}
