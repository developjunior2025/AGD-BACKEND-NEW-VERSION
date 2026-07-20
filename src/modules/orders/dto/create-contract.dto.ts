import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateContractDto {
  @IsString()
  @MaxLength(100)
  contractNumber: string;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  termsSummary?: string;
}
