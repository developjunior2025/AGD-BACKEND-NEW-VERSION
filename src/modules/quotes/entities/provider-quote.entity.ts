import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { Opportunity } from './opportunity.entity';
import { ProviderQuoteStatus } from '../enums/quote.enums';
import { QuoteVersion } from './quote-version.entity';
import { TechnicalProposal } from './technical-proposal.entity';
import { EconomicProposal } from './economic-proposal.entity';

/** provider_quotes (§9.2): cotización del proveedor para una oportunidad. */
@Entity('provider_quotes')
export class ProviderQuote extends BaseAuditEntity {
  @Index()
  @Column({ name: 'opportunity_id', type: 'uuid' })
  opportunityId: string;

  @ManyToOne(() => Opportunity, (opportunity) => opportunity.quotes)
  @JoinColumn({ name: 'opportunity_id' })
  opportunity: Opportunity;

  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ name: 'valid_until', type: 'date', nullable: true })
  validUntil: string | null;

  @Column({
    type: 'enum',
    enum: ProviderQuoteStatus,
    default: ProviderQuoteStatus.BORRADOR,
  })
  status: ProviderQuoteStatus;

  @Column({ type: 'int', default: 1 })
  version: number;

  @OneToMany(() => QuoteVersion, (quoteVersion) => quoteVersion.providerQuote)
  versions: QuoteVersion[];

  @OneToOne(() => TechnicalProposal, (proposal) => proposal.providerQuote)
  technicalProposal: TechnicalProposal;

  @OneToOne(() => EconomicProposal, (proposal) => proposal.providerQuote)
  economicProposal: EconomicProposal;
}
