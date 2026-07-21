import { Column, Entity } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { BackupStatus } from '../enums/admin.enums';

/** backup_records (§9.11 / §6.10 "Backups"). */
@Entity('backup_records')
export class BackupRecord extends BaseAuditEntity {
  @Column({ name: 'backup_type', type: 'varchar', length: 100 })
  backupType: string;

  @Column({ name: 'file_path', type: 'varchar', length: 500, nullable: true })
  filePath: string | null;

  @Column({ name: 'size_bytes', type: 'bigint', nullable: true })
  sizeBytes: number | null;

  @Column({ name: 'started_at', type: 'timestamp' })
  startedAt: Date;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @Column({
    type: 'enum',
    enum: BackupStatus,
    default: BackupStatus.EN_PROCESO,
  })
  status: BackupStatus;
}
