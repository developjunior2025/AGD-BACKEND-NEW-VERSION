import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { ServiceModality } from '../enums/service.enums';

export class CreateLogisticsServiceDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsUUID()
  providerProfileId: string;

  @IsUUID()
  categoryId: string;

  @IsOptional()
  @IsUUID()
  subcategoryId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ServiceModality)
  modality?: ServiceModality;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  location?: string;

  @IsOptional()
  @IsInt()
  estimatedDurationDays?: number;

  @IsOptional()
  @IsString()
  resourcesIncluded?: string;

  @IsOptional()
  @IsString()
  equipmentIncluded?: string;

  @IsOptional()
  @IsString()
  staffRequired?: string;

  @IsOptional()
  @IsString()
  conditions?: string;

  @IsOptional()
  @IsString()
  warranty?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: string[];
}
