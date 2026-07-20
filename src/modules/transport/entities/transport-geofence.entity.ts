import { Column, Entity } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** transport_geofences (§9.7 / §4.4.5 "Geocercas"). */
@Entity('transport_geofences')
export class TransportGeofence extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'center_lat', type: 'decimal', precision: 10, scale: 7 })
  centerLat: string;

  @Column({ name: 'center_lng', type: 'decimal', precision: 10, scale: 7 })
  centerLng: string;

  @Column({ name: 'radius_meters', type: 'decimal', precision: 10, scale: 2 })
  radiusMeters: string;

  @Column({
    name: 'geofence_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  geofenceType: string | null;
}
