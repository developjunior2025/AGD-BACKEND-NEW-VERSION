import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import { resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);
  const apiPrefix = configService.get<string>('app.apiPrefix') ?? 'api';
  const corsOrigin = configService.get<string>('app.corsOrigin') ?? '*';
  const storagePath = resolve(
    configService.get<string>('fileStorage.localPath') ?? './storage',
  );

  app.use(helmet());
  app.enableCors({
    origin: corsOrigin === '*' ? true : corsOrigin.split(','),
    credentials: true,
  });
  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useStaticAssets(storagePath, { prefix: '/uploads' });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Marketplace Logístico Integral API')
    .setDescription('API del backend del Marketplace Logístico Integral')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get<number>('app.port') ?? 3000;
  await app.listen(port);
}

void bootstrap();
