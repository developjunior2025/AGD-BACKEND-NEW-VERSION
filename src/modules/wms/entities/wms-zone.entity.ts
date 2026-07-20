import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsWarehouse } from './wms-warehouse.entity';
import { WmsRack } from './wms-rack.entity';
import { WmsLocation } from './wms-location.entity';

/** wms_zones (§9.6 / §4.4.4 "Zonas y racks"). */
@Entity('wms_zones')
export class WmsZone extends BaseAuditEntity {
  @Index()
  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @ManyToOne(() => WmsWarehouse, (warehouse) => warehouse.zones)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: WmsWarehouse;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'zone_type', type: 'varchar', length: 100, nullable: true })
  zoneType: string | null;

  @OneToMany(() => WmsRack, (rack) => rack.zone)
  racks: WmsRack[];

  @OneToMany(() => WmsLocation, (location) => location.zone)
  locations: WmsLocation[];
}
