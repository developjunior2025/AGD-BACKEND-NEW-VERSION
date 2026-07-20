import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { DiscountType } from '../enums/promotion.enums';

export class CreatePromotionDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsUUID()
  providerProfileId: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(DiscountType)
  discountType: DiscountType;

  @IsOptional()
  @IsNumberString()
  discountValue?: string;

  @IsOptional()
  @IsNumberString()
  promoPrice?: string;

  @IsDateString()
  validFrom: string;

  @IsDateString()
  validUntil: string;

  @IsOptional()
  @IsInt()
  maxRedemptions?: number;
}
