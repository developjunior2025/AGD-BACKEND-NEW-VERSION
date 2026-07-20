import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { InvoiceStatus } from '../enums/trade.enums';
import { TradePaymentReceipt } from './trade-payment-receipt.entity';

/** trade_commercial_invoices (§9.8 / §4.4.6 "Factura comercial definitiva"). */
@Entity('trade_commercial_invoices')
export class TradeCommercialInvoice extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @Index({ unique: true })
  @Column({ name: 'invoice_number', type: 'varchar', length: 100 })
  invoiceNumber: string;

  @Column({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2 })
  totalAmount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate: string | null;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.PENDIENTE,
  })
  status: InvoiceStatus;

  @OneToMany(() => TradePaymentReceipt, (receipt) => receipt.invoice)
  paymentReceipts: TradePaymentReceipt[];
}
