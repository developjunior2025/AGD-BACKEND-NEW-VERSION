import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { HealthCheckStatus, SecurityEventSeverity } from '../enums/admin.enums';

export class RecordHealthCheckDto {
  @IsString()
  @MaxLength(100)
  component: string;

  @IsEnum(HealthCheckStatus)
  status: HealthCheckStatus;

  @IsOptional()
  @IsString()
  details?: string;
}

export class CreateScheduledTaskDto {
  @IsString()
  @MaxLength(150)
  taskName: string;

  @IsString()
  @MaxLength(100)
  cronExpression: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateBackupRecordDto {
  @IsString()
  @MaxLength(100)
  backupType: string;
}

export class RecordSecurityEventDto {
  @IsString()
  @MaxLength(100)
  eventType: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(SecurityEventSeverity)
  severity?: SecurityEventSeverity;
}
