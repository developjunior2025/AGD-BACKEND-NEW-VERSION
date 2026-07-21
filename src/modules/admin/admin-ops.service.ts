import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SystemHealthCheck } from './entities/system-health-check.entity';
import { BackgroundJob } from './entities/background-job.entity';
import { ScheduledTask } from './entities/scheduled-task.entity';
import { BackupRecord } from './entities/backup-record.entity';
import { SecurityEvent } from './entities/security-event.entity';
import { SessionLog } from './entities/session-log.entity';
import {
  BackgroundJobStatus,
  BackupStatus,
  ScheduledTaskStatus,
  SessionStatus,
} from './enums/admin.enums';
import {
  CreateBackupRecordDto,
  CreateScheduledTaskDto,
  RecordHealthCheckDto,
  RecordSecurityEventDto,
} from './dto/ops.dto';

@Injectable()
export class AdminOpsService {
  constructor(
    @InjectRepository(SystemHealthCheck)
    private readonly healthCheckRepository: Repository<SystemHealthCheck>,
    @InjectRepository(BackgroundJob)
    private readonly backgroundJobRepository: Repository<BackgroundJob>,
    @InjectRepository(ScheduledTask)
    private readonly scheduledTaskRepository: Repository<ScheduledTask>,
    @InjectRepository(BackupRecord)
    private readonly backupRepository: Repository<BackupRecord>,
    @InjectRepository(SecurityEvent)
    private readonly securityEventRepository: Repository<SecurityEvent>,
    @InjectRepository(SessionLog)
    private readonly sessionLogRepository: Repository<SessionLog>,
  ) {}

  recordHealthCheck(dto: RecordHealthCheckDto): Promise<SystemHealthCheck> {
    return this.healthCheckRepository.save(
      this.healthCheckRepository.create({ ...dto, checkedAt: new Date() }),
    );
  }

  findLatestHealthChecks(): Promise<SystemHealthCheck[]> {
    return this.healthCheckRepository.find({
      order: { checkedAt: 'DESC' },
      take: 20,
    });
  }

  findBackgroundJobs(status?: BackgroundJobStatus): Promise<BackgroundJob[]> {
    return this.backgroundJobRepository.find({
      where: status ? { status } : {},
      order: { createdAt: 'DESC' },
    });
  }

  createScheduledTask(dto: CreateScheduledTaskDto): Promise<ScheduledTask> {
    return this.scheduledTaskRepository.save(
      this.scheduledTaskRepository.create(dto),
    );
  }

  findAllScheduledTasks(): Promise<ScheduledTask[]> {
    return this.scheduledTaskRepository.find({ order: { taskName: 'ASC' } });
  }

  async pauseScheduledTask(id: string): Promise<ScheduledTask> {
    const task = await this.scheduledTaskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarea programada ${id} no encontrada.`);
    }
    task.status = ScheduledTaskStatus.PAUSADA;
    return this.scheduledTaskRepository.save(task);
  }

  createBackupRecord(dto: CreateBackupRecordDto): Promise<BackupRecord> {
    return this.backupRepository.save(
      this.backupRepository.create({ ...dto, startedAt: new Date() }),
    );
  }

  async completeBackup(
    id: string,
    filePath: string,
    sizeBytes: number,
  ): Promise<BackupRecord> {
    const backup = await this.backupRepository.findOne({ where: { id } });
    if (!backup) {
      throw new NotFoundException(`Backup ${id} no encontrado.`);
    }
    backup.status = BackupStatus.COMPLETADO;
    backup.completedAt = new Date();
    backup.filePath = filePath;
    backup.sizeBytes = sizeBytes;
    return this.backupRepository.save(backup);
  }

  findAllBackups(): Promise<BackupRecord[]> {
    return this.backupRepository.find({ order: { startedAt: 'DESC' } });
  }

  recordSecurityEvent(
    userId: string | null,
    ipAddress: string | null,
    dto: RecordSecurityEventDto,
  ): Promise<SecurityEvent> {
    return this.securityEventRepository.save(
      this.securityEventRepository.create({
        ...dto,
        userId,
        ipAddress,
        occurredAt: new Date(),
      }),
    );
  }

  findSecurityEvents(): Promise<SecurityEvent[]> {
    return this.securityEventRepository.find({
      order: { occurredAt: 'DESC' },
      take: 100,
    });
  }

  recordSessionLogin(
    userId: string,
    ipAddress: string | null,
    userAgent: string | null,
  ): Promise<SessionLog> {
    return this.sessionLogRepository.save(
      this.sessionLogRepository.create({
        userId,
        ipAddress,
        userAgent,
        loginAt: new Date(),
      }),
    );
  }

  async recordSessionLogout(id: string): Promise<SessionLog> {
    const session = await this.sessionLogRepository.findOne({ where: { id } });
    if (!session) {
      throw new NotFoundException(`Sesión ${id} no encontrada.`);
    }
    session.logoutAt = new Date();
    session.status = SessionStatus.CERRADA;
    return this.sessionLogRepository.save(session);
  }

  findSessionsForUser(userId: string): Promise<SessionLog[]> {
    return this.sessionLogRepository.find({
      where: { userId },
      order: { loginAt: 'DESC' },
    });
  }
}
