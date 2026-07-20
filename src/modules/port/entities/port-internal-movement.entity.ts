import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** port_internal_movements (§9.4 / §4.4.2 "Movilización interna"). */
@Entity('port_internal_movements')
export class PortInternalMovement extends BaseAuditEntity {
  @Index()
  @Column({ name: 'container_id', type: 'uuid' })
  containerId: string;

  @Column({ name: 'from_slot_id', type: 'uuid', nullable: true })
  fromSlotId: string | null;

  @Column({ name: 'to_slot_id', type: 'uuid', nullable: true })
  toSlotId: string | null;

  @Column({ name: 'moved_at', type: 'timestamp' })
  movedAt: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  reason: string | null;
}
