import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** trade_proforma_invoices (§9.8 / §4.4.6 "Factura proforma"). */
@Entity('trade_proforma_invoices')
export class TradeProformaInvoice extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @Index({ unique: true })
  @Column({ name: 'proforma_number', type: 'varchar', length: 100 })
  proformaNumber: string;

  @Column({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2 })
  totalAmount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ name: 'valid_until', type: 'date', nullable: true })
  validUntil: string | null;
}
