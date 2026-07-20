import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ProfileType } from '../../../common/enums/profile-type.enum';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;

  @IsString()
  @MaxLength(150)
  firstName: string;

  @IsString()
  @MaxLength(150)
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @IsEnum(ProfileType)
  profileType: ProfileType;
}
