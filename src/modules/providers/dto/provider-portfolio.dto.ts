import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AddProviderPortfolioDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class AddProviderPortfolioItemDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  mediaUrl?: string;
}
