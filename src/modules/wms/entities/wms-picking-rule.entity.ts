import { Column, Entity } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** wms_picking_rules (§9.6 / §4.4.4 "Reglas de picking"). */
@Entity('wms_picking_rules')
export class WmsPickingRule extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  strategy: string;

  @Column({ type: 'text', nullable: true })
  criteria: string | null;
}
