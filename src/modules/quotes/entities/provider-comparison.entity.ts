import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** provider_comparisons (§9.2 / §4.1 "Comparador"): snapshot de una comparación del cliente. */
@Entity('provider_comparisons')
export class ProviderComparison extends BaseAuditEntity {
  @Index()
  @Column({ name: 'quote_request_id', type: 'uuid' })
  quoteRequestId: string;

  @Index()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'compared_quote_ids', type: 'json' })
  comparedQuoteIds: string[];

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
