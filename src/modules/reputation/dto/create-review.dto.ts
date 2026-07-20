import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class RatingScoreDto {
  @IsString()
  @MaxLength(100)
  dimension: string;

  @IsInt()
  @Min(1)
  @Max(5)
  score: number;
}

export class CreateReviewDto {
  @IsUUID()
  providerProfileId: string;

  @IsString()
  @MaxLength(2000)
  comment: string;

  @IsOptional()
  @IsUUID()
  relatedOrderId?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => RatingScoreDto)
  ratings: RatingScoreDto[];
}
