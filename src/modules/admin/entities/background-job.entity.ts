import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { BackgroundJobStatus } from '../enums/admin.enums';

/** background_jobs (§9.11 / §6.10): registro de tareas asíncronas (BullMQ). */
@Entity('background_jobs')
export class BackgroundJob extends BaseAuditEntity {
  @Index()
  @Column({ name: 'job_name', type: 'varchar', length: 150 })
  jobName: string;

  @Column({ name: 'queue_name', type: 'varchar', length: 100, nullable: true })
  queueName: string | null;

  @Column({
    type: 'enum',
    enum: BackgroundJobStatus,
    default: BackgroundJobStatus.PENDIENTE,
  })
  status: BackgroundJobStatus;

  @Column({ type: 'json', nullable: true })
  payload: Record<string, unknown> | null;

  @Column({ name: 'started_at', type: 'timestamp', nullable: true })
  startedAt: Date | null;

  @Column({ name: 'finished_at', type: 'timestamp', nullable: true })
  finishedAt: Date | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;
}
