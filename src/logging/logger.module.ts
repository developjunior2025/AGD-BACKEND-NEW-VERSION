import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    PinoLoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isDevelopment = config.get<string>('app.env') !== 'production';
        return {
          pinoHttp: {
            level: isDevelopment ? 'debug' : 'info',
            transport: isDevelopment
              ? { target: 'pino-pretty', options: { singleLine: true } }
              : undefined,
            redact: ['req.headers.authorization', 'req.headers.cookie'],
            autoLogging: true,
          },
        };
      },
    }),
  ],
  exports: [PinoLoggerModule],
})
export class LoggerModule {}
