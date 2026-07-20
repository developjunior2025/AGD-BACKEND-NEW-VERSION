import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { RiskLevel, SelectivityChannel } from '../enums/customs.enums';

export class SetValuationDto {
  @IsString()
  @MaxLength(150)
  method: string;

  @IsNumberString()
  declaredValue: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsObject()
  adjustments?: Record<string, unknown>;

  @IsNumberString()
  totalValue: string;
}

export class AddTaxItemDto {
  @IsString()
  @MaxLength(100)
  taxType: string;

  @IsNumberString()
  baseAmount: string;

  @IsOptional()
  @IsNumberString()
  rate?: string;

  @IsNumberString()
  amount: string;
}

export class MarkTaxPaidDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  paymentReference?: string;
}

export class AssignChannelDto {
  @IsEnum(SelectivityChannel)
  channel: SelectivityChannel;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateRiskProfileDto {
  @IsUUID()
  importerExporterId: string;

  @IsEnum(RiskLevel)
  riskLevel: RiskLevel;

  @IsOptional()
  @IsObject()
  factors?: Record<string, unknown>;
}

export class ScheduleInspectionDto {
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
