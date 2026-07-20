import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateVesselDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(20)
  imoNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  flag?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  vesselType?: string;

  @IsOptional()
  @IsNumberString()
  capacity?: string;
}

export class CreateEquipmentDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsString()
  @MaxLength(100)
  equipmentType: string;
}

export class CreateYardDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsInt()
  capacity?: number;
}

export class CreateYardSlotDto {
  @IsString()
  @MaxLength(50)
  slotCode: string;
}
