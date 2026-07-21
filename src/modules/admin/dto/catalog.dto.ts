import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ParameterDataType } from '../enums/admin.enums';

export class CreateDatabaseTableCatalogDto {
  @IsString()
  @MaxLength(150)
  technicalName: string;

  @IsString()
  @MaxLength(200)
  functionalName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  module?: string;

  @IsOptional()
  @IsString()
  purpose?: string;

  @IsOptional()
  @IsBoolean()
  isOwnTable?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  primaryKey?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  foreignKeys?: string[];
}

export class AddDatabaseFieldDto {
  @IsString()
  @MaxLength(150)
  fieldName: string;

  @IsString()
  @MaxLength(100)
  dataType: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateApiEndpointDto {
  @IsString()
  @MaxLength(20)
  method: string;

  @IsString()
  @MaxLength(300)
  path: string;

  @IsOptional()
  @IsUUID()
  moduleId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  requiresAuth?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requiredRoles?: string[];
}

export class CreateBusinessRuleDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  ruleCategory?: string;

  @IsOptional()
  @IsUUID()
  relatedModuleId?: string;
}

export class SetGlobalParameterDto {
  @IsString()
  @MaxLength(150)
  key: string;

  @IsString()
  value: string;

  @IsOptional()
  @IsEnum(ParameterDataType)
  dataType?: ParameterDataType;

  @IsOptional()
  @IsString()
  description?: string;
}

export class AddTechnicalCatalogEntryDto {
  @IsString()
  @MaxLength(150)
  catalogName: string;

  @IsString()
  @MaxLength(150)
  catalogKey: string;

  @IsString()
  @MaxLength(300)
  catalogValue: string;

  @IsOptional()
  @IsString()
  description?: string;
}
