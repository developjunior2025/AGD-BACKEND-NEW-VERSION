import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InspectionResultOutcome } from '../enums/customs.enums';

export class AddInspectionResultDto {
  @IsEnum(InspectionResultOutcome)
  outcome: InspectionResultOutcome;

  @IsOptional()
  @IsString()
  findings?: string;

  @IsOptional()
  @IsString()
  actaUrl?: string;
}

export class AuthorizeReleaseDto {
  @IsString()
  releaseNumber: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
