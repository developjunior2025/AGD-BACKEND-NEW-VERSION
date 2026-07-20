import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { QuoteRequest } from './quote-request.entity';

/** quote_request_items (§9.2): renglones de una solicitud de cotización. */
@Entity('quote_request_items')
export class QuoteRequestItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'quote_request_id', type: 'uuid' })
  quoteRequestId: string;

  @ManyToOne(() => QuoteRequest, (quoteRequest) => quoteRequest.items)
  @JoinColumn({ name: 'quote_request_id' })
  quoteRequest: QuoteRequest;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 1 })
  quantity: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit: string | null;
}
