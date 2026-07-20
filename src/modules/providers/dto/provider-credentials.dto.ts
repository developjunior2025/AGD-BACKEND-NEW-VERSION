import {
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class AddProviderCertificationDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  issuedBy?: string;

  @IsOptional()
  @IsDateString()
  issuedAt?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}

export class AddProviderLicenseDto extends AddProviderCertificationDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  licenseNumber?: string;
}

export class AddProviderInsuranceDto {
  @IsString()
  @MaxLength(200)
  insurer: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  policyNumber?: string;

  @IsOptional()
  @IsNumberString()
  coverageAmount?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;
}
