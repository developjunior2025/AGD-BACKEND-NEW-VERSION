import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateRetentionRuleDto {
  @IsUUID()
  documentTypeId: string;

  @IsOptional()
  @IsInt()
  retentionPeriodMonths?: number;

  @IsOptional()
  @IsBoolean()
  isPermanent?: boolean;

  @IsOptional()
  @IsString()
  description?: string;
}
