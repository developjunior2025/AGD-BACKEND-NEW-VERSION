import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * Infraestructura de colas (BullMQ + Redis) reutilizable por los módulos de
 * negocio. Las colas concretas (envío de correos, expedición de reportes,
 * verificación de vencimientos, etc.) se registran vía BullModule.registerQueue
 * dentro de cada módulo de dominio a medida que se implementan.
 */
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('redis.host'),
          port: config.get<number>('redis.port'),
          password: config.get<string>('redis.password'),
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
