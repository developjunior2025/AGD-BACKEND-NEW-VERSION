import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFurTypeDto {
  @IsString()
  @MaxLength(50)
  code: string;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsString()
  @MaxLength(100)
  ecosystem: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
