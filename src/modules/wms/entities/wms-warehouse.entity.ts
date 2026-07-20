import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsZone } from './wms-zone.entity';

/** wms_warehouses (§9.6). */
@Entity('wms_warehouses')
export class WmsWarehouse extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string | null;

  @OneToMany(() => WmsZone, (zone) => zone.warehouse)
  zones: WmsZone[];
}
