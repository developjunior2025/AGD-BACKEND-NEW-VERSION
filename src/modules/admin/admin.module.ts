import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionalModule } from './entities/functional-module.entity';
import { ModuleProfile } from './entities/module-profile.entity';
import { UseCase } from './entities/use-case.entity';
import { UseCaseStep } from './entities/use-case-step.entity';
import { UseCaseRule } from './entities/use-case-rule.entity';
import { DatabaseTableCatalog } from './entities/database-table-catalog.entity';
import { DatabaseFieldCatalog } from './entities/database-field-catalog.entity';
import { ApiEndpointCatalog } from './entities/api-endpoint-catalog.entity';
import { BusinessRuleCatalog } from './entities/business-rule-catalog.entity';
import { GlobalParameter } from './entities/global-parameter.entity';
import { TechnicalCatalog } from './entities/technical-catalog.entity';
import { SystemHealthCheck } from './entities/system-health-check.entity';
import { BackgroundJob } from './entities/background-job.entity';
import { ScheduledTask } from './entities/scheduled-task.entity';
import { BackupRecord } from './entities/backup-record.entity';
import { SecurityEvent } from './entities/security-event.entity';
import { SessionLog } from './entities/session-log.entity';
import { MarketplaceUserProfile } from '../identity/entities/marketplace-user-profile.entity';
import { MarketplaceOrganization } from '../identity/entities/marketplace-organization.entity';
import { ProviderProfile } from '../providers/entities/provider-profile.entity';
import { CargoFile } from '../cargo-files/entities/cargo-file.entity';
import { LogisticsOrder } from '../orders/entities/logistics-order.entity';
import { AdminDocsService } from './admin-docs.service';
import { AdminCatalogService } from './admin-catalog.service';
import { AdminOpsService } from './admin-ops.service';
import { AdminReportsService } from './admin-reports.service';
import { AdminDocsController } from './admin-docs.controller';
import { AdminCatalogController } from './admin-catalog.controller';
import { AdminOpsController } from './admin-ops.controller';
import { AdminReportsController } from './admin-reports.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FunctionalModule,
      ModuleProfile,
      UseCase,
      UseCaseStep,
      UseCaseRule,
      DatabaseTableCatalog,
      DatabaseFieldCatalog,
      ApiEndpointCatalog,
      BusinessRuleCatalog,
      GlobalParameter,
      TechnicalCatalog,
      SystemHealthCheck,
      BackgroundJob,
      ScheduledTask,
      BackupRecord,
      SecurityEvent,
      SessionLog,
      MarketplaceUserProfile,
      MarketplaceOrganization,
      ProviderProfile,
      CargoFile,
      LogisticsOrder,
    ]),
  ],
  controllers: [
    AdminDocsController,
    AdminCatalogController,
    AdminOpsController,
    AdminReportsController,
  ],
  providers: [
    AdminDocsService,
    AdminCatalogService,
    AdminOpsService,
    AdminReportsService,
  ],
  exports: [
    AdminDocsService,
    AdminCatalogService,
    AdminOpsService,
    AdminReportsService,
  ],
})
export class AdminModule {}
