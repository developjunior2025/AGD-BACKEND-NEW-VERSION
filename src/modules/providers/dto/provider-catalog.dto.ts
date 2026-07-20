import { IsOptional, IsString, MaxLength } from 'class-validator';

export class AddProviderCategoryDto {
  @IsString()
  @MaxLength(100)
  categoryCode: string;

  @IsString()
  @MaxLength(150)
  categoryName: string;
}

export class AddProviderSpecialtyDto {
  @IsString()
  @MaxLength(200)
  name: string;
}

export class AddProviderServiceAreaDto {
  @IsString()
  @MaxLength(100)
  country: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  region?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  city?: string;
}
