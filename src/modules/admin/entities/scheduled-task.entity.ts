import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ScheduledTaskStatus } from '../enums/admin.enums';

/** scheduled_tasks (§9.11 / @nestjs/schedule): catálogo de tareas programadas. */
@Entity('scheduled_tasks')
export class ScheduledTask extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'task_name', type: 'varchar', length: 150 })
  taskName: string;

  @Column({ name: 'cron_expression', type: 'varchar', length: 100 })
  cronExpression: string;

  @Column({ name: 'last_run_at', type: 'timestamp', nullable: true })
  lastRunAt: Date | null;

  @Column({ name: 'next_run_at', type: 'timestamp', nullable: true })
  nextRunAt: Date | null;

  @Column({
    type: 'enum',
    enum: ScheduledTaskStatus,
    default: ScheduledTaskStatus.ACTIVA,
  })
  status: ScheduledTaskStatus;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
