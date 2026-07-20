import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsTaskStatus } from '../enums/wms.enums';

/** wms_tasks (§9.6): tareas operativas asignadas (picking, packing, putaway, conteo). */
@Entity('wms_tasks')
export class WmsTask extends BaseAuditEntity {
  @Index()
  @Column({ name: 'task_type', type: 'varchar', length: 100 })
  taskType: string;

  @Column({ name: 'reference_id', type: 'uuid', nullable: true })
  referenceId: string | null;

  @Index()
  @Column({ name: 'assigned_to', type: 'uuid', nullable: true })
  assignedTo: string | null;

  @Column({
    type: 'enum',
    enum: WmsTaskStatus,
    default: WmsTaskStatus.PENDIENTE,
  })
  status: WmsTaskStatus;

  @Column({ name: 'due_at', type: 'timestamp', nullable: true })
  dueAt: Date | null;
}
