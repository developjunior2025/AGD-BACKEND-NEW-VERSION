import { IsOptional, IsString } from 'class-validator';

export class CloseCommercialDto {
  @IsOptional()
  @IsString()
  summary?: string;
}
