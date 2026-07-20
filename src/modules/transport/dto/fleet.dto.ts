import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  taxId?: string;

  @IsOptional()
  @IsUUID()
  organizationId?: string;
}

export class CreateVehicleDto {
  @IsString()
  @MaxLength(50)
  plateNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  vehicleType?: string;

  @IsOptional()
  @IsNumberString()
  capacity?: string;
}

export class CreateDriverDto {
  @IsString()
  @MaxLength(200)
  fullName: string;

  @IsString()
  @MaxLength(100)
  licenseNumber: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}

export class AddDriverCredentialDto {
  @IsString()
  @MaxLength(100)
  credentialType: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;

  @IsOptional()
  @IsString()
  issuedAt?: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}

export class AddVehicleDocumentDto {
  @IsString()
  @MaxLength(100)
  documentType: string;

  @IsOptional()
  @IsString()
  documentUrl?: string;

  @IsOptional()
  @IsString()
  issuedAt?: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}
