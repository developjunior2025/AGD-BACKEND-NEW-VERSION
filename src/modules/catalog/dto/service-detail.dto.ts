import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  ServicePriceType,
  ServiceRequirementType,
} from '../enums/service.enums';

export class SetServiceScopeDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includedActivities?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  excludedActivities?: string[];
}

export class AddServiceRequirementDto {
  @IsEnum(ServiceRequirementType)
  type: ServiceRequirementType;

  @IsString()
  @MaxLength(300)
  description: string;
}

export class AddServiceDeliverableDto {
  @IsString()
  @MaxLength(300)
  description: string;
}

export class AddServicePricingDto {
  @IsEnum(ServicePriceType)
  priceType: ServicePriceType;

  @IsOptional()
  @IsNumberString()
  amount?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  unit?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class AddServicePackageDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumberString()
  price?: string;
}

export class SetServiceAvailabilityDto {
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsInt()
  leadTimeDays?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
