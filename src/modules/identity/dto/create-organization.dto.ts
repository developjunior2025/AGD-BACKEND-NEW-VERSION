import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @MaxLength(255)
  legalName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  tradeName?: string;

  @IsString()
  @MaxLength(50)
  taxId: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  website?: string;
}
