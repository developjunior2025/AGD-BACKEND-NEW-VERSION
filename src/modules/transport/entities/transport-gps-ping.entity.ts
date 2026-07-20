import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** transport_gps_pings (§9.7 / §4.4.5 "Tracking GPS"). */
@Entity('transport_gps_pings')
export class TransportGpsPing extends BaseAuditEntity {
  @Index()
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  lat: string;

  @Column({ type: 'decimal', precision: 10, scale: 7 })
  lng: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
  speed: string | null;

  @Column({ name: 'recorded_at', type: 'timestamp' })
  recordedAt: Date;
}
