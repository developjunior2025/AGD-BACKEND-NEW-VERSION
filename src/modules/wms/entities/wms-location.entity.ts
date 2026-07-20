import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsZone } from './wms-zone.entity';
import { WmsRack } from './wms-rack.entity';

/** wms_locations (§9.6 / §4.4.4 "Maestro de ubicaciones"). */
@Entity('wms_locations')
export class WmsLocation extends BaseAuditEntity {
  @Index()
  @Column({ name: 'zone_id', type: 'uuid' })
  zoneId: string;

  @ManyToOne(() => WmsZone, (zone) => zone.locations)
  @JoinColumn({ name: 'zone_id' })
  zone: WmsZone;

  @Column({ name: 'rack_id', type: 'uuid', nullable: true })
  rackId: string | null;

  @ManyToOne(() => WmsRack, (rack) => rack.locations, { nullable: true })
  @JoinColumn({ name: 'rack_id' })
  rack: WmsRack | null;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({
    name: 'location_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  locationType: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  capacity: string | null;
}
