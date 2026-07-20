import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderQuote } from './provider-quote.entity';

/** quote_versions (§9.2, regla §10: "Las cotizaciones deberán conservar versiones"). */
@Entity('quote_versions')
export class QuoteVersion extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_quote_id', type: 'uuid' })
  providerQuoteId: string;

  @ManyToOne(() => ProviderQuote, (quote) => quote.versions)
  @JoinColumn({ name: 'provider_quote_id' })
  providerQuote: ProviderQuote;

  @Column({ name: 'version_number', type: 'int' })
  versionNumber: number;

  @Column({ type: 'json' })
  snapshot: Record<string, unknown>;

  @Column({ name: 'change_summary', type: 'text', nullable: true })
  changeSummary: string | null;
}
