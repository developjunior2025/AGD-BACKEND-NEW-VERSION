import {
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { TradeDocumentBaseDto } from './base.dto';

export class CreateProformaInvoiceDto extends TradeDocumentBaseDto {
  @IsString()
  @MaxLength(100)
  proformaNumber: string;

  @IsNumberString()
  totalAmount: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  validUntil?: string;
}

export class CreateCommercialInvoiceDto extends TradeDocumentBaseDto {
  @IsString()
  @MaxLength(100)
  invoiceNumber: string;

  @IsNumberString()
  totalAmount: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  dueDate?: string;
}

export class RecordPaymentDto {
  @IsNumberString()
  amount: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  method?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  reference?: string;
}

export class CreateCreditNoteDto extends TradeDocumentBaseDto {
  @IsString()
  @MaxLength(100)
  noteNumber: string;

  @IsOptional()
  @IsUUID()
  relatedInvoiceId?: string;

  @IsNumberString()
  amount: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  currency?: string;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class CreateDebitNoteDto extends CreateCreditNoteDto {}
