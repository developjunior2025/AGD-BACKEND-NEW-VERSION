import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';

export class SetTechnicalProposalDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}

export class SetEconomicProposalDto {
  @IsOptional()
  @IsObject()
  breakdown?: Record<string, unknown>;

  @IsNumberString()
  totalAmount: string;

  @IsOptional()
  @IsString()
  currency?: string;
}
