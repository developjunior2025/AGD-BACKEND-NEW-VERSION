import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class TradeDocumentBaseDto {
  @IsString()
  @MaxLength(100)
  code: string;

  @IsOptional()
  @IsUUID()
  cargoFileId?: string;

  @IsOptional()
  @IsUUID()
  orderId?: string;
}
