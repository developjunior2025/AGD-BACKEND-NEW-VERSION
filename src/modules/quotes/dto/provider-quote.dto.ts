import {
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProviderQuoteDto {
  @IsNumberString()
  amount: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsDateString()
  validUntil?: string;
}

export class UpdateProviderQuoteDto extends CreateProviderQuoteDto {
  @IsOptional()
  @IsString()
  changeSummary?: string;
}
