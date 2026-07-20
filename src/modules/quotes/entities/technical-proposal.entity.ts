import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderQuote } from './provider-quote.entity';

/**
 * technical_proposals (§9.2, regla §10: "Las propuestas técnicas y
 * económicas deberán gestionarse separadamente").
 */
@Entity('technical_proposals')
export class TechnicalProposal extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'provider_quote_id', type: 'uuid' })
  providerQuoteId: string;

  @OneToOne(() => ProviderQuote, (quote) => quote.technicalProposal)
  @JoinColumn({ name: 'provider_quote_id' })
  providerQuote: ProviderQuote;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'json', nullable: true })
  attachments: string[] | null;
}
