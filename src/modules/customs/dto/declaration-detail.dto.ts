import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { CustomsDeclarationStatus } from '../enums/customs.enums';

export class AddRequirementDto {
  @IsString()
  description: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

export class AddCustomsObservationDto {
  @IsString()
  observation: string;
}

export class TransitionDeclarationDto {
  @IsEnum(CustomsDeclarationStatus)
  status: CustomsDeclarationStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}
