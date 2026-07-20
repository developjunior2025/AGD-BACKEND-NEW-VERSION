import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CargoFileStatus } from '../enums/cargo-file.enums';

export class TransitionCargoFileDto {
  @IsEnum(CargoFileStatus)
  status: CargoFileStatus;

  @IsOptional()
  @IsString()
  reason?: string;
}
