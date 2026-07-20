import { IsString, IsUUID, MaxLength } from 'class-validator';

export class AddPromotionServiceDto {
  @IsUUID()
  logisticsServiceId: string;
}

export class AddPromotionConditionDto {
  @IsString()
  @MaxLength(300)
  description: string;
}
