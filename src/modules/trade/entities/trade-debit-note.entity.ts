import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** trade_debit_notes (§9.8 / §4.4.6 "Nota de débito"). */
@Entity('trade_debit_notes')
export class TradeDebitNote extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @Index({ unique: true })
  @Column({ name: 'note_number', type: 'varchar', length: 100 })
  noteNumber: string;

  @Column({ name: 'related_invoice_id', type: 'uuid', nullable: true })
  relatedInvoiceId: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'text', nullable: true })
  reason: string | null;
}
