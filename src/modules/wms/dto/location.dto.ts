import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateWarehouseDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  location?: string;
}

export class CreateZoneDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  zoneType?: string;
}

export class CreateRackDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsOptional()
  @IsInt()
  levels?: number;
}

export class CreateLocationDto {
  @IsUUID()
  zoneId: string;

  @IsOptional()
  @IsUUID()
  rackId?: string;

  @IsString()
  @MaxLength(100)
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  locationType?: string;

  @IsOptional()
  @IsNumberString()
  capacity?: string;
}
