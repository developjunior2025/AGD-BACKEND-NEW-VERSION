import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { RouteStopType } from '../enums/transport.enums';

export class AssignTripDto {
  @IsUUID()
  vehicleId: string;

  @IsUUID()
  driverId: string;
}

export class CreateRouteDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;
}

export class AddRouteStopDto {
  @IsInt()
  stopOrder: number;

  @IsString()
  @MaxLength(500)
  address: string;

  @IsEnum(RouteStopType)
  stopType: RouteStopType;

  @IsOptional()
  @IsDateString()
  plannedAt?: string;
}

export class AddTripMilestoneDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsDateString()
  plannedAt?: string;
}
