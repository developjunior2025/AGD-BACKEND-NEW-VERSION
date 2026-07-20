import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateControlledDeleteRequestDto {
  @IsString()
  @MaxLength(150)
  entityType: string;

  @IsUUID()
  entityId: string;

  @IsString()
  justification: string;
}

export class ReviewControlledDeleteRequestDto {
  @IsOptional()
  @IsString()
  reason?: string;
}
