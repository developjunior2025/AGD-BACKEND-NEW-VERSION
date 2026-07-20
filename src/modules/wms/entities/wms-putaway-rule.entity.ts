import { Column, Entity } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** wms_putaway_rules (§9.6 / §4.4.4 "Reglas de putaway"). */
@Entity('wms_putaway_rules')
export class WmsPutawayRule extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  criteria: string | null;

  @Column({ name: 'target_zone_id', type: 'uuid', nullable: true })
  targetZoneId: string | null;

  @Column({ type: 'int', default: 0 })
  priority: number;
}
