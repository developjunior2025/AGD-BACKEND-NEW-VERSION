import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { QuoteRequest } from './quote-request.entity';
import { OpportunityStatus } from '../enums/quote.enums';
import { ProviderQuote } from './provider-quote.entity';

/** opportunities (§9.2 / §6.7 "Recibir oportunidad"): bandeja del proveedor. */
@Entity('opportunities')
export class Opportunity extends BaseAuditEntity {
  @Index()
  @Column({ name: 'quote_request_id', type: 'uuid' })
  quoteRequestId: string;

  @ManyToOne(() => QuoteRequest, (quoteRequest) => quoteRequest.opportunities)
  @JoinColumn({ name: 'quote_request_id' })
  quoteRequest: QuoteRequest;

  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @Column({
    type: 'enum',
    enum: OpportunityStatus,
    default: OpportunityStatus.NUEVA,
  })
  status: OpportunityStatus;

  @Column({ name: 'viewed_at', type: 'timestamp', nullable: true })
  viewedAt: Date | null;

  @OneToMany(() => ProviderQuote, (quote) => quote.opportunity)
  quotes: ProviderQuote[];
}
