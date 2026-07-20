import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import {
  appConfig,
  databaseConfig,
  fileStorageConfig,
  jwtConfig,
  mailerConfig,
  redisConfig,
  throttleConfig,
} from './config/configuration';
import { validateEnv } from './config/env.validation';
import { LoggerModule } from './logging/logger.module';
import { DatabaseModule } from './database/database.module';
import { QueueModule } from './queue/queue.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AuditModule } from './modules/audit/audit.module';
import { FurModule } from './modules/fur/fur.module';
import { IdentityModule } from './modules/identity/identity.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { ReputationModule } from './modules/reputation/reputation.module';
import { QuotesModule } from './modules/quotes/quotes.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PromotionsModule } from './modules/promotions/promotions.module';
import { DocumentGovernanceModule } from './modules/document-governance/document-governance.module';
import { CargoFilesModule } from './modules/cargo-files/cargo-files.module';
import { CustomsModule } from './modules/customs/customs.module';
import { PortModule } from './modules/port/port.module';
import { AgdModule } from './modules/agd/agd.module';
import { FilesModule } from './modules/files/files.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      load: [
        appConfig,
        databaseConfig,
        jwtConfig,
        redisConfig,
        throttleConfig,
        mailerConfig,
        fileStorageConfig,
      ],
    }),
    LoggerModule,
    DatabaseModule,
    QueueModule,
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        throttlers: [
          {
            ttl: parseInt(process.env.THROTTLE_TTL ?? '60000', 10),
            limit: parseInt(process.env.THROTTLE_LIMIT ?? '100', 10),
          },
        ],
      }),
    }),
    AuditModule,
    FurModule,
    IdentityModule,
    AuthModule,
    ProvidersModule,
    CatalogModule,
    ReputationModule,
    QuotesModule,
    OrdersModule,
    PromotionsModule,
    DocumentGovernanceModule,
    CargoFilesModule,
    CustomsModule,
    PortModule,
    AgdModule,
    FilesModule,
    NotificationsModule,
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
