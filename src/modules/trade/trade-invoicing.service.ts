import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeProformaInvoice } from './entities/trade-proforma-invoice.entity';
import { TradeCommercialInvoice } from './entities/trade-commercial-invoice.entity';
import { TradePaymentReceipt } from './entities/trade-payment-receipt.entity';
import { TradeCreditNote } from './entities/trade-credit-note.entity';
import { TradeDebitNote } from './entities/trade-debit-note.entity';
import { InvoiceStatus, TradeDocumentType } from './enums/trade.enums';
import { TradeDocumentsService } from './trade-documents.service';
import {
  CreateCommercialInvoiceDto,
  CreateCreditNoteDto,
  CreateDebitNoteDto,
  CreateProformaInvoiceDto,
  RecordPaymentDto,
} from './dto/invoicing.dto';

@Injectable()
export class TradeInvoicingService {
  constructor(
    @InjectRepository(TradeProformaInvoice)
    private readonly proformaRepository: Repository<TradeProformaInvoice>,
    @InjectRepository(TradeCommercialInvoice)
    private readonly invoiceRepository: Repository<TradeCommercialInvoice>,
    @InjectRepository(TradePaymentReceipt)
    private readonly receiptRepository: Repository<TradePaymentReceipt>,
    @InjectRepository(TradeCreditNote)
    private readonly creditNoteRepository: Repository<TradeCreditNote>,
    @InjectRepository(TradeDebitNote)
    private readonly debitNoteRepository: Repository<TradeDebitNote>,
    private readonly tradeDocumentsService: TradeDocumentsService,
  ) {}

  async createProformaInvoice(
    dto: CreateProformaInvoiceDto,
  ): Promise<TradeProformaInvoice> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.FACTURA_PROFORMA,
      dto,
    );
    return this.proformaRepository.save(
      this.proformaRepository.create({ ...dto, documentId: document.id }),
    );
  }

  async createCommercialInvoice(
    dto: CreateCommercialInvoiceDto,
  ): Promise<TradeCommercialInvoice> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.FACTURA_COMERCIAL,
      dto,
    );
    return this.invoiceRepository.save(
      this.invoiceRepository.create({ ...dto, documentId: document.id }),
    );
  }

  async findInvoice(id: string): Promise<TradeCommercialInvoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: { paymentReceipts: true },
    });
    if (!invoice) {
      throw new NotFoundException(`Factura comercial ${id} no encontrada.`);
    }
    return invoice;
  }

  /** Registra un comprobante de pago y marca la factura como pagada si cubre el total (§4.4.6). */
  async recordPayment(
    invoiceId: string,
    dto: RecordPaymentDto,
  ): Promise<TradePaymentReceipt> {
    const invoice = await this.findInvoice(invoiceId);

    const receipt = await this.receiptRepository.save(
      this.receiptRepository.create({ ...dto, invoiceId, paidAt: new Date() }),
    );

    const receipts = await this.receiptRepository.find({
      where: { invoiceId },
    });
    const totalPaid = receipts.reduce(
      (sum, current) => sum + Number(current.amount),
      0,
    );
    if (totalPaid >= Number(invoice.totalAmount)) {
      invoice.status = InvoiceStatus.PAGADA;
      await this.invoiceRepository.save(invoice);
    }

    return receipt;
  }

  async createCreditNote(dto: CreateCreditNoteDto): Promise<TradeCreditNote> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.NOTA_CREDITO,
      dto,
    );
    return this.creditNoteRepository.save(
      this.creditNoteRepository.create({ ...dto, documentId: document.id }),
    );
  }

  async createDebitNote(dto: CreateDebitNoteDto): Promise<TradeDebitNote> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.NOTA_DEBITO,
      dto,
    );
    return this.debitNoteRepository.save(
      this.debitNoteRepository.create({ ...dto, documentId: document.id }),
    );
  }
}
