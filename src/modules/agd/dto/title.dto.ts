import {
  IsDateString,
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { TitleType } from '../enums/agd.enums';

export class IssueCertificateDto {
  @IsString()
  @MaxLength(100)
  certificateNumber: string;

  @IsOptional()
  @IsNumberString()
  value?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;
}

export class IssuePledgeBondDto {
  @IsString()
  @MaxLength(100)
  bondNumber: string;

  @IsOptional()
  @IsUUID()
  certificateId?: string;

  @IsOptional()
  @IsNumberString()
  value?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;
}

export class AddEndorsementDto {
  @IsEnum(TitleType)
  titleType: TitleType;

  @IsUUID()
  titleId: string;

  @IsUUID()
  endorsedTo: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class SetValidityDto {
  @IsEnum(TitleType)
  titleType: TitleType;

  @IsUUID()
  titleId: string;

  @IsDateString()
  validFrom: string;

  @IsDateString()
  validUntil: string;
}
