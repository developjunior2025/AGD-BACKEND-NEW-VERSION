import {
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateReceiptDto {
  @IsUUID()
  warehouseId: string;

  @IsString()
  @MaxLength(100)
  receiptNumber: string;

  @IsOptional()
  @IsDateString()
  expectedAt?: string;
}

export class AddReceiptItemDto {
  @IsUUID()
  skuId: string;

  @IsOptional()
  @IsUUID()
  lotId?: string;

  @IsNumberString()
  expectedQuantity: string;
}

export class ReceiveItemDto {
  @IsNumberString()
  receivedQuantity: string;

  @IsUUID()
  locationId: string;
}
