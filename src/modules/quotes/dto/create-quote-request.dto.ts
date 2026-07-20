import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class QuoteRequestItemDto {
  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsNumberString()
  quantity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;
}

export class CreateQuoteRequestDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @IsOptional()
  @IsUUID()
  logisticsServiceId?: string;

  @IsOptional()
  @IsDateString()
  desiredStartDate?: string;

  @IsOptional()
  @IsDateString()
  desiredEndDate?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuoteRequestItemDto)
  items?: QuoteRequestItemDto[];
}
