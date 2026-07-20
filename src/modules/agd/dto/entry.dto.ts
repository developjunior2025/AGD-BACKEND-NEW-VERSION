import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEntryRequestDto {
  @IsUUID()
  warehouseId: string;

  @IsOptional()
  @IsUUID()
  cargoFileId?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  scheduledAt?: string;
}

export class CompleteReceptionDto {
  @IsOptional()
  @IsString()
  notes?: string;
}
