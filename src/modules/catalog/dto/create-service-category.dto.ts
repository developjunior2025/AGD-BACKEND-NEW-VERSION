import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateServiceCategoryDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateServiceSubcategoryDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
