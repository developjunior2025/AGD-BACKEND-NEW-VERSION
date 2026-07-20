import { plainToInstance } from 'class-transformer';
import {
  IsBooleanString,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsIn(['development', 'test', 'production'])
  @IsOptional()
  NODE_ENV: string;

  @IsNumberString()
  @IsOptional()
  PORT: string;

  @IsString()
  @IsOptional()
  API_PREFIX: string;

  @IsString()
  @IsOptional()
  CORS_ORIGIN: string;

  @IsString()
  DB_HOST: string;

  @IsNumberString()
  DB_PORT: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  @IsOptional()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  @IsBooleanString()
  @IsOptional()
  DB_SYNCHRONIZE: string;

  @IsBooleanString()
  @IsOptional()
  DB_LOGGING: string;

  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsOptional()
  JWT_ACCESS_EXPIRES_IN: string;

  @IsString()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsOptional()
  JWT_REFRESH_EXPIRES_IN: string;

  @IsString()
  REDIS_HOST: string;

  @IsNumberString()
  REDIS_PORT: string;

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    whitelist: true,
  });

  if (errors.length > 0) {
    throw new Error(
      `Configuración de entorno inválida:\n${errors.map((e) => e.toString()).join('\n')}`,
    );
  }

  return validatedConfig;
}
