import {
  IsEnum,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CustodyMovementType } from '../enums/agd.enums';

export class CreateCustodyLotDto {
  @IsString()
  @MaxLength(100)
  lotCode: string;

  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsNumberString()
  quantity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  warehouseLocation?: string;
}

export class AddCustodyMovementDto {
  @IsEnum(CustodyMovementType)
  movementType: CustodyMovementType;

  @IsNumberString()
  quantity: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
