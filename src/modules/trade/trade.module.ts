import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeDocument } from './entities/trade-document.entity';
import { TradeProformaInvoice } from './entities/trade-proforma-invoice.entity';
import { TradeCommercialInvoice } from './entities/trade-commercial-invoice.entity';
import { TradePaymentReceipt } from './entities/trade-payment-receipt.entity';
import { TradeCreditNote } from './entities/trade-credit-note.entity';
import { TradeDebitNote } from './entities/trade-debit-note.entity';
import { TradePackingList } from './entities/trade-packing-list.entity';
import { TradePackingListItem } from './entities/trade-packing-list-item.entity';
import { TradeBillOfLading } from './entities/trade-bill-of-lading.entity';
import { TradeAirWaybill } from './entities/trade-air-waybill.entity';
import { TradeCertificateOfOrigin } from './entities/trade-certificate-of-origin.entity';
import { TradeShippingInstruction } from './entities/trade-shipping-instruction.entity';
import { TradeCommercialClosure } from './entities/trade-commercial-closure.entity';
import { TradeDocumentsService } from './trade-documents.service';
import { TradeInvoicingService } from './trade-invoicing.service';
import { TradeShippingDocsService } from './trade-shipping-docs.service';
import { TradeDocumentsController } from './trade-documents.controller';
import { TradeInvoicingController } from './trade-invoicing.controller';
import { TradeShippingDocsController } from './trade-shipping-docs.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TradeDocument,
      TradeProformaInvoice,
      TradeCommercialInvoice,
      TradePaymentReceipt,
      TradeCreditNote,
      TradeDebitNote,
      TradePackingList,
      TradePackingListItem,
      TradeBillOfLading,
      TradeAirWaybill,
      TradeCertificateOfOrigin,
      TradeShippingInstruction,
      TradeCommercialClosure,
    ]),
  ],
  controllers: [
    TradeDocumentsController,
    TradeInvoicingController,
    TradeShippingDocsController,
  ],
  providers: [
    TradeDocumentsService,
    TradeInvoicingService,
    TradeShippingDocsService,
  ],
  exports: [
    TradeDocumentsService,
    TradeInvoicingService,
    TradeShippingDocsService,
  ],
})
export class TradeModule {}
