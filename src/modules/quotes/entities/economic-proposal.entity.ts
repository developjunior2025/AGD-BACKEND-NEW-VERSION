import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderQuote } from './provider-quote.entity';

/** economic_proposals (§9.2): desglose económico separado de la propuesta técnica. */
@Entity('economic_proposals')
export class EconomicProposal extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'provider_quote_id', type: 'uuid' })
  providerQuoteId: string;

  @OneToOne(() => ProviderQuote, (quote) => quote.economicProposal)
  @JoinColumn({ name: 'provider_quote_id' })
  providerQuote: ProviderQuote;

  @Column({ type: 'json', nullable: true })
  breakdown: Record<string, unknown> | null;

  @Column({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2 })
  totalAmount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;
}
