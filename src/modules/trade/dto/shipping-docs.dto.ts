import {
  IsInt,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TradeDocumentBaseDto } from './base.dto';

export class CreatePackingListDto extends TradeDocumentBaseDto {
  @IsOptional()
  @IsInt()
  totalPackages?: number;

  @IsOptional()
  @IsNumberString()
  totalWeight?: string;

  @IsOptional()
  @IsNumberString()
  totalVolume?: string;
}

export class AddPackingListItemDto {
  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  packageType?: string;

  @IsOptional()
  @IsNumberString()
  quantity?: string;

  @IsOptional()
  @IsNumberString()
  weight?: string;
}

export class CreateBillOfLadingDto extends TradeDocumentBaseDto {
  @IsString()
  @MaxLength(100)
  blNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  shipper?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  consignee?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  vessel?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  portOfLoading?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  portOfDischarge?: string;
}

export class CreateAirWaybillDto extends TradeDocumentBaseDto {
  @IsString()
  @MaxLength(100)
  awbNumber: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  carrier?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  originAirport?: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  destinationAirport?: string;
}

export class CreateCertificateOfOriginDto extends TradeDocumentBaseDto {
  @IsString()
  @MaxLength(100)
  certificateNumber: string;

  @IsString()
  @MaxLength(100)
  originCountry: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  issuedBy?: string;
}

export class CreateShippingInstructionDto extends TradeDocumentBaseDto {
  @IsString()
  instructions: string;

  @IsOptional()
  @IsString()
  specialHandling?: string;
}
