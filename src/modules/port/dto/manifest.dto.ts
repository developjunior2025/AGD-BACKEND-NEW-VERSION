import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ReconciliationStatus } from '../enums/port.enums';

export class ManifestItemDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  containerNumber?: string;

  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsNumberString()
  weight?: string;

  @IsOptional()
  @IsUUID()
  cargoFileId?: string;
}

export class CreateManifestDto {
  @IsString()
  @MaxLength(100)
  manifestNumber: string;

  @IsDateString()
  submittedAt: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ManifestItemDto)
  items?: ManifestItemDto[];
}

export class ReconcileManifestDto {
  @IsEnum(ReconciliationStatus)
  status: ReconciliationStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class AddDiscrepancyDto {
  @IsString()
  description: string;
}
