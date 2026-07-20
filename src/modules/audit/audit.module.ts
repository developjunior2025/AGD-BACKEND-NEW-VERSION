import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditInterceptor } from '../../common/interceptors/audit.interceptor';
import { AuditLog } from './entities/audit-log.entity';
import { ImmutableAuditEvent } from './entities/immutable-audit-event.entity';
import { AuditService } from './audit.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog, ImmutableAuditEvent])],
  providers: [
    AuditService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  exports: [AuditService],
})
export class AuditModule {}
