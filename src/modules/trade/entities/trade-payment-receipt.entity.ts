import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TradeCommercialInvoice } from './trade-commercial-invoice.entity';

/** trade_payment_receipts (§9.8 / §4.4.6 "Comprobante de pago"). */
@Entity('trade_payment_receipts')
export class TradePaymentReceipt extends BaseAuditEntity {
  @Index()
  @Column({ name: 'invoice_id', type: 'uuid' })
  invoiceId: string;

  @ManyToOne(() => TradeCommercialInvoice, (invoice) => invoice.paymentReceipts)
  @JoinColumn({ name: 'invoice_id' })
  invoice: TradeCommercialInvoice;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ name: 'paid_at', type: 'timestamp' })
  paidAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  method: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  reference: string | null;
}
