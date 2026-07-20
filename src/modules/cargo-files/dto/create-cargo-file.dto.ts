import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { CargoOperationType, CargoType } from '../enums/cargo-file.enums';

export class CreateCargoFileDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsEnum(CargoType)
  cargoType: CargoType;

  @IsEnum(CargoOperationType)
  operationType: CargoOperationType;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  regime?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  originCountry?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  destinationCountry?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
