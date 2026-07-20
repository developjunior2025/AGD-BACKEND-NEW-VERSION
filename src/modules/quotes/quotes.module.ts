import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuoteRequest } from './entities/quote-request.entity';
import { QuoteRequestItem } from './entities/quote-request-item.entity';
import { Opportunity } from './entities/opportunity.entity';
import { ProviderQuote } from './entities/provider-quote.entity';
import { QuoteVersion } from './entities/quote-version.entity';
import { TechnicalProposal } from './entities/technical-proposal.entity';
import { EconomicProposal } from './entities/economic-proposal.entity';
import { ProviderComparison } from './entities/provider-comparison.entity';
import { QuoteRequestsService } from './quote-requests.service';
import { ProviderQuotesService } from './provider-quotes.service';
import { QuoteRequestsController } from './quote-requests.controller';
import { ProviderQuotesController } from './provider-quotes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuoteRequest,
      QuoteRequestItem,
      Opportunity,
      ProviderQuote,
      QuoteVersion,
      TechnicalProposal,
      EconomicProposal,
      ProviderComparison,
    ]),
  ],
  controllers: [QuoteRequestsController, ProviderQuotesController],
  providers: [QuoteRequestsService, ProviderQuotesService],
  exports: [QuoteRequestsService, ProviderQuotesService],
})
export class QuotesModule {}
