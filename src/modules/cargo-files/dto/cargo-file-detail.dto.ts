import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { AlertSeverity } from '../enums/cargo-file.enums';

export class AddCargoFilePartyDto {
  @IsString()
  @MaxLength(100)
  role: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  organizationId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;
}

export class AddCargoFileDocumentDto {
  @IsUUID()
  documentInstanceId: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;
}

export class CreateChecklistDto {
  @IsString()
  @MaxLength(200)
  name: string;
}

export class AddChecklistItemDto {
  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsUUID()
  documentTypeId?: string;
}

export class AddMilestoneDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsDateString()
  plannedAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class AddAlertDto {
  @IsString()
  @MaxLength(100)
  type: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsEnum(AlertSeverity)
  severity?: AlertSeverity;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
