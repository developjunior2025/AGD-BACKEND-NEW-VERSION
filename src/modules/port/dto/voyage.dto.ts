import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateVoyageDto {
  @IsUUID()
  vesselId: string;

  @IsString()
  @MaxLength(100)
  voyageNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  originPort?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  destinationPort?: string;

  @IsOptional()
  @IsDateString()
  eta?: string;
}

export class RequestArrivalDto {
  @IsDateString()
  requestedAt: string;
}

export class RequestBerthDto {
  @IsDateString()
  requestedWindowStart: string;

  @IsDateString()
  requestedWindowEnd: string;
}

export class AssignBerthDto {
  @IsString()
  @MaxLength(50)
  berthCode: string;

  @IsDateString()
  assignedStart: string;

  @IsDateString()
  assignedEnd: string;
}

export class CreateOperatingWindowDto {
  @IsDateString()
  windowStart: string;

  @IsDateString()
  windowEnd: string;
}

export class CloseOperationDto {
  @IsOptional()
  @IsString()
  summary?: string;
}
