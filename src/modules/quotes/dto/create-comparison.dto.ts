import {
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateComparisonDto {
  @IsArray()
  @ArrayMinSize(2)
  @IsUUID('4', { each: true })
  comparedQuoteIds: string[];

  @IsOptional()
  @IsString()
  notes?: string;
}
