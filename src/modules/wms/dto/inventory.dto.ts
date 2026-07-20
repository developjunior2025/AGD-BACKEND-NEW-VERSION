import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  skuId: string;

  @IsOptional()
  @IsUUID()
  locationId?: string;

  @IsNumberString()
  quantity: string;

  @IsOptional()
  @IsUUID()
  reservedFor?: string;
}

export class CreateCycleCountDto {
  @IsUUID()
  warehouseId: string;

  @IsUUID()
  skuId: string;

  @IsUUID()
  locationId: string;

  @IsOptional()
  @IsNumberString()
  expectedQuantity?: string;
}

export class RecordCountDto {
  @IsNumberString()
  countedQuantity: string;
}

export class CreateAdjustmentDto {
  @IsUUID()
  skuId: string;

  @IsUUID()
  locationId: string;

  @IsNumberString()
  quantityDelta: string;

  @IsString()
  @MaxLength(300)
  reason: string;
}
