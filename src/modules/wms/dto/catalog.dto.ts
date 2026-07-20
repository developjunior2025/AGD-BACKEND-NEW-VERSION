import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  brand?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  category?: string;
}

export class CreateSkuDto {
  @IsUUID()
  productId: string;

  @IsString()
  @MaxLength(100)
  code: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  unitOfMeasure?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  barcode?: string;

  @IsOptional()
  @IsNumberString()
  weight?: string;
}

export class CreateLotDto {
  @IsUUID()
  skuId: string;

  @IsString()
  @MaxLength(100)
  lotNumber: string;

  @IsOptional()
  @IsString()
  manufacturedAt?: string;

  @IsOptional()
  @IsString()
  expiresAt?: string;
}

export class CreateSerialDto {
  @IsUUID()
  skuId: string;

  @IsOptional()
  @IsUUID()
  lotId?: string;

  @IsString()
  @MaxLength(150)
  serialNumber: string;
}
