import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { UseCaseFlowType } from '../enums/admin.enums';

export class CreateFunctionalModuleDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(100)
  ecosystem: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  apiBasePath?: string;
}

export class AddModuleProfileDto {
  @IsString()
  @MaxLength(100)
  profileType: string;
}

export class UseCaseStepDto {
  @IsInt()
  stepOrder: number;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(UseCaseFlowType)
  flowType?: UseCaseFlowType;
}

export class CreateUseCaseDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsUUID()
  moduleId?: string;

  @IsString()
  @MaxLength(150)
  primaryActor: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  secondaryActors?: string[];

  @IsString()
  objective: string;

  @IsOptional()
  @IsString()
  preconditions?: string;

  @IsOptional()
  @IsString()
  trigger?: string;

  @IsOptional()
  @IsString()
  postconditions?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UseCaseStepDto)
  steps?: UseCaseStepDto[];
}

export class AddUseCaseRuleDto {
  @IsString()
  description: string;
}
