import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class DeclarationItemDto {
  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsUUID()
  tariffClassificationId?: string;

  @IsOptional()
  @IsNumberString()
  quantity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;

  @IsOptional()
  @IsNumberString()
  weight?: string;

  @IsOptional()
  @IsNumberString()
  value?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  originCountry?: string;
}

export class CreateDeclarationDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsUUID()
  cargoFileId: string;

  @IsUUID()
  regimeId: string;

  @IsUUID()
  importerExporterId: string;

  @IsUUID()
  brokerId: string;

  @IsOptional()
  @IsBoolean()
  isComplementary?: boolean;

  @IsOptional()
  @IsUUID()
  parentDeclarationId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DeclarationItemDto)
  items?: DeclarationItemDto[];
}
