import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateRegimeDto {
  @IsString()
  @MaxLength(50)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateTariffClassificationDto {
  @IsString()
  @MaxLength(50)
  code: string;

  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsNumberString()
  dutyRate?: string;
}

export class CreateBrokerAuthorizationDto {
  @IsUUID()
  brokerId: string;

  @IsString()
  @MaxLength(100)
  authorizationNumber: string;

  @IsString()
  issuedAt: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}
