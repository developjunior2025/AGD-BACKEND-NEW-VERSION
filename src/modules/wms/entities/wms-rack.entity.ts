import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsZone } from './wms-zone.entity';
import { WmsLocation } from './wms-location.entity';

/** wms_racks (§9.6 / §4.4.4 "Zonas y racks"). */
@Entity('wms_racks')
export class WmsRack extends BaseAuditEntity {
  @Index()
  @Column({ name: 'zone_id', type: 'uuid' })
  zoneId: string;

  @ManyToOne(() => WmsZone, (zone) => zone.racks)
  @JoinColumn({ name: 'zone_id' })
  zone: WmsZone;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'int', nullable: true })
  levels: number | null;

  @OneToMany(() => WmsLocation, (location) => location.rack)
  locations: WmsLocation[];
}
