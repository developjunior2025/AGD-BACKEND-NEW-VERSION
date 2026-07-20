import { IsOptional, IsString } from 'class-validator';

export class DecideFurDto {
  @IsOptional()
  @IsString()
  comments?: string;
}

export class AddFurObservationDto {
  @IsString()
  observation: string;
}

export class CloseFurObservationDto {
  @IsOptional()
  @IsString()
  closureEvidence?: string;
}
