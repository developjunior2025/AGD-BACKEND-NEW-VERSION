import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class FurFieldValueDto {
  @IsString()
  @MaxLength(150)
  fieldKey: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  fieldLabel?: string;

  @IsOptional()
  @IsString()
  fieldValue?: string;
}

export class CreateFurRecordDto {
  @IsUUID()
  furTypeId: string;

  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  objectives?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  sourceEntityType?: string;

  @IsOptional()
  @IsUUID()
  sourceEntityId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FurFieldValueDto)
  fields?: FurFieldValueDto[];
}
