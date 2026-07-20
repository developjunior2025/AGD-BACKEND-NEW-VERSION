import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TradeInvoicingService } from './trade-invoicing.service';
import {
  CreateCommercialInvoiceDto,
  CreateCreditNoteDto,
  CreateDebitNoteDto,
  CreateProformaInvoiceDto,
  RecordPaymentDto,
} from './dto/invoicing.dto';

@ApiTags('Documentos comerciales - Facturación')
@ApiBearerAuth()
@Controller()
export class TradeInvoicingController {
  constructor(private readonly tradeInvoicingService: TradeInvoicingService) {}

  @Post('trade-proforma-invoices')
  createProformaInvoice(@Body() dto: CreateProformaInvoiceDto) {
    return this.tradeInvoicingService.createProformaInvoice(dto);
  }

  @Post('trade-commercial-invoices')
  createCommercialInvoice(@Body() dto: CreateCommercialInvoiceDto) {
    return this.tradeInvoicingService.createCommercialInvoice(dto);
  }

  @Get('trade-commercial-invoices/:id')
  findInvoice(@Param('id', ParseUUIDPipe) id: string) {
    return this.tradeInvoicingService.findInvoice(id);
  }

  @Post('trade-commercial-invoices/:id/payments')
  recordPayment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RecordPaymentDto,
  ) {
    return this.tradeInvoicingService.recordPayment(id, dto);
  }

  @Post('trade-credit-notes')
  createCreditNote(@Body() dto: CreateCreditNoteDto) {
    return this.tradeInvoicingService.createCreditNote(dto);
  }

  @Post('trade-debit-notes')
  createDebitNote(@Body() dto: CreateDebitNoteDto) {
    return this.tradeInvoicingService.createDebitNote(dto);
  }
}
