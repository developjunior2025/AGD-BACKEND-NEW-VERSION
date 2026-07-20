import {
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateTransportOrderDto {
  @IsOptional()
  @IsUUID()
  cargoFileId?: string;

  @IsString()
  @MaxLength(500)
  originAddress: string;

  @IsString()
  @MaxLength(500)
  destinationAddress: string;

  @IsOptional()
  @IsDateString()
  requestedPickupAt?: string;

  @IsOptional()
  @IsDateString()
  requestedDeliveryAt?: string;
}
