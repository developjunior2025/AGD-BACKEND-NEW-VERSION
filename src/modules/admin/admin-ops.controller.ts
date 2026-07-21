import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { AdminOpsService } from './admin-ops.service';
import { BackgroundJobStatus } from './enums/admin.enums';
import {
  CreateBackupRecordDto,
  CreateScheduledTaskDto,
  RecordHealthCheckDto,
  RecordSecurityEventDto,
} from './dto/ops.dto';

@ApiTags('Administración - Operación del sistema')
@ApiBearerAuth()
@Roles(ProfileType.SUPERADMINISTRADOR)
@Controller()
export class AdminOpsController {
  constructor(private readonly adminOpsService: AdminOpsService) {}

  @Post('system-health-checks')
  recordHealthCheck(@Body() dto: RecordHealthCheckDto) {
    return this.adminOpsService.recordHealthCheck(dto);
  }

  @Get('system-health-checks')
  findLatestHealthChecks() {
    return this.adminOpsService.findLatestHealthChecks();
  }

  @Get('background-jobs')
  findBackgroundJobs(@Query('status') status?: BackgroundJobStatus) {
    return this.adminOpsService.findBackgroundJobs(status);
  }

  @Post('scheduled-tasks')
  createScheduledTask(@Body() dto: CreateScheduledTaskDto) {
    return this.adminOpsService.createScheduledTask(dto);
  }

  @Get('scheduled-tasks')
  findAllScheduledTasks() {
    return this.adminOpsService.findAllScheduledTasks();
  }

  @Patch('scheduled-tasks/:id/pause')
  pauseScheduledTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminOpsService.pauseScheduledTask(id);
  }

  @Post('backup-records')
  createBackupRecord(@Body() dto: CreateBackupRecordDto) {
    return this.adminOpsService.createBackupRecord(dto);
  }

  @Get('backup-records')
  findAllBackups() {
    return this.adminOpsService.findAllBackups();
  }

  @Post('security-events')
  recordSecurityEvent(
    @Body() dto: RecordSecurityEventDto,
    @CurrentUser() user: AuthenticatedUser,
    @Req() request: Request,
  ) {
    return this.adminOpsService.recordSecurityEvent(
      user.id,
      request.ip ?? null,
      dto,
    );
  }

  @Get('security-events')
  findSecurityEvents() {
    return this.adminOpsService.findSecurityEvents();
  }

  @Get('session-logs')
  findSessionsForUser(@Query('userId', ParseUUIDPipe) userId: string) {
    return this.adminOpsService.findSessionsForUser(userId);
  }
}
