import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;
}
