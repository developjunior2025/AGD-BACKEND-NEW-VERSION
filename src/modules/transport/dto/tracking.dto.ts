import {
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class RecordGpsPingDto {
  @IsNumberString()
  lat: string;

  @IsNumberString()
  lng: string;

  @IsOptional()
  @IsNumberString()
  speed?: string;
}

export class CreateGeofenceDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsNumberString()
  centerLat: string;

  @IsNumberString()
  centerLng: string;

  @IsNumberString()
  radiusMeters: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  geofenceType?: string;
}
