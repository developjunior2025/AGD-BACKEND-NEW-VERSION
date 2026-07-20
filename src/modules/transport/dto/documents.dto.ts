import {
  IsArray,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IncidentSeverity } from '../enums/transport.enums';

export class CreateWaybillDto {
  @IsString()
  @MaxLength(100)
  waybillNumber: string;
}

export class CreateDeliveryNoteDto {
  @IsString()
  @MaxLength(100)
  noteNumber: string;
}

export class AddIncidentDto {
  @IsString()
  @MaxLength(100)
  incidentType: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(IncidentSeverity)
  severity?: IncidentSeverity;
}

export class RecordPodDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  receivedBy?: string;

  @IsOptional()
  @IsString()
  signatureUrl?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photoUrls?: string[];
}

export class AddTripExpenseDto {
  @IsString()
  @MaxLength(100)
  expenseType: string;

  @IsNumberString()
  amount: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;
}

export class CloseTripDto {
  @IsOptional()
  @IsString()
  summary?: string;
}
