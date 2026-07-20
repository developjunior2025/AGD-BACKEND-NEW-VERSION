import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  env: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  apiPrefix: process.env.API_PREFIX ?? 'api',
  corsOrigin: process.env.CORS_ORIGIN ?? '*',
}));

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
}));

export const jwtConfig = registerAs('jwt', () => ({
  accessSecret: process.env.JWT_ACCESS_SECRET,
  accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
}));

export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
}));

export const throttleConfig = registerAs('throttle', () => ({
  ttl: parseInt(process.env.THROTTLE_TTL ?? '60000', 10),
  limit: parseInt(process.env.THROTTLE_LIMIT ?? '100', 10),
}));

export const mailerConfig = registerAs('mailer', () => ({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT ?? '1025', 10),
  user: process.env.MAIL_USER || undefined,
  password: process.env.MAIL_PASSWORD || undefined,
  from:
    process.env.MAIL_FROM ?? 'AGD Marketplace <no-reply@agd-marketplace.local>',
}));

export const fileStorageConfig = registerAs('fileStorage', () => ({
  localPath: process.env.FILE_STORAGE_LOCAL_PATH ?? './storage',
  maxSizeMb: parseInt(process.env.FILE_STORAGE_MAX_SIZE_MB ?? '20', 10),
}));
