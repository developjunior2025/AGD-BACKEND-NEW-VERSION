import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opportunity } from './entities/opportunity.entity';
import { ProviderQuote } from './entities/provider-quote.entity';
import { QuoteVersion } from './entities/quote-version.entity';
import { TechnicalProposal } from './entities/technical-proposal.entity';
import { EconomicProposal } from './entities/economic-proposal.entity';
import { OpportunityStatus, ProviderQuoteStatus } from './enums/quote.enums';
import {
  CreateProviderQuoteDto,
  UpdateProviderQuoteDto,
} from './dto/provider-quote.dto';
import {
  SetEconomicProposalDto,
  SetTechnicalProposalDto,
} from './dto/proposal.dto';

@Injectable()
export class ProviderQuotesService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
    @InjectRepository(ProviderQuote)
    private readonly quoteRepository: Repository<ProviderQuote>,
    @InjectRepository(QuoteVersion)
    private readonly versionRepository: Repository<QuoteVersion>,
    @InjectRepository(TechnicalProposal)
    private readonly technicalProposalRepository: Repository<TechnicalProposal>,
    @InjectRepository(EconomicProposal)
    private readonly economicProposalRepository: Repository<EconomicProposal>,
  ) {}

  listOpportunitiesForProvider(
    providerProfileId: string,
  ): Promise<Opportunity[]> {
    return this.opportunityRepository.find({
      where: { providerProfileId },
      relations: { quoteRequest: { items: true }, quotes: true },
      order: { createdAt: 'DESC' },
    });
  }

  async viewOpportunity(id: string): Promise<Opportunity> {
    const opportunity = await this.getOpportunity(id);
    if (opportunity.status === OpportunityStatus.NUEVA) {
      opportunity.status = OpportunityStatus.EN_ANALISIS;
      opportunity.viewedAt = new Date();
      await this.opportunityRepository.save(opportunity);
    }
    return opportunity;
  }

  async createQuote(
    opportunityId: string,
    dto: CreateProviderQuoteDto,
  ): Promise<ProviderQuote> {
    const opportunity = await this.getOpportunity(opportunityId);
    const quote = await this.quoteRepository.save(
      this.quoteRepository.create({
        ...dto,
        opportunityId,
        providerProfileId: opportunity.providerProfileId,
      }),
    );
    await this.recordVersion(quote, 'Creación inicial de la cotización.');
    return quote;
  }

  async updateQuote(
    id: string,
    dto: UpdateProviderQuoteDto,
  ): Promise<ProviderQuote> {
    const quote = await this.getQuote(id);
    if (quote.status !== ProviderQuoteStatus.BORRADOR) {
      throw new BadRequestException(
        'Solo se puede editar una cotización en borrador.',
      );
    }
    const { changeSummary, ...rest } = dto;
    Object.assign(quote, rest);
    quote.version += 1;
    const saved = await this.quoteRepository.save(quote);
    await this.recordVersion(
      saved,
      changeSummary ?? 'Actualización de la cotización.',
    );
    return saved;
  }

  async submit(id: string): Promise<ProviderQuote> {
    const quote = await this.getQuote(id);
    if (quote.status !== ProviderQuoteStatus.BORRADOR) {
      throw new BadRequestException(
        'Solo se puede enviar una cotización en borrador.',
      );
    }
    quote.status = ProviderQuoteStatus.ENVIADA;
    const saved = await this.quoteRepository.save(quote);

    await this.opportunityRepository.update(
      { id: quote.opportunityId },
      { status: OpportunityStatus.COTIZADA },
    );

    return saved;
  }

  async reject(id: string): Promise<ProviderQuote> {
    const quote = await this.getQuote(id);
    if (quote.status !== ProviderQuoteStatus.ENVIADA) {
      throw new BadRequestException(
        'Solo se puede rechazar una cotización enviada.',
      );
    }
    quote.status = ProviderQuoteStatus.RECHAZADA;
    return this.quoteRepository.save(quote);
  }

  async setTechnicalProposal(
    providerQuoteId: string,
    dto: SetTechnicalProposalDto,
  ): Promise<TechnicalProposal> {
    await this.getQuote(providerQuoteId);
    let proposal = await this.technicalProposalRepository.findOne({
      where: { providerQuoteId },
    });
    if (!proposal) {
      proposal = this.technicalProposalRepository.create({ providerQuoteId });
    }
    Object.assign(proposal, dto);
    return this.technicalProposalRepository.save(proposal);
  }

  async setEconomicProposal(
    providerQuoteId: string,
    dto: SetEconomicProposalDto,
  ): Promise<EconomicProposal> {
    await this.getQuote(providerQuoteId);
    let proposal = await this.economicProposalRepository.findOne({
      where: { providerQuoteId },
    });
    if (!proposal) {
      proposal = this.economicProposalRepository.create({ providerQuoteId });
    }
    Object.assign(proposal, dto);
    return this.economicProposalRepository.save(proposal);
  }

  async getQuote(id: string): Promise<ProviderQuote> {
    const quote = await this.quoteRepository.findOne({
      where: { id },
      relations: {
        technicalProposal: true,
        economicProposal: true,
        opportunity: true,
      },
    });
    if (!quote) {
      throw new NotFoundException(`Cotización ${id} no encontrada.`);
    }
    return quote;
  }

  private async getOpportunity(id: string): Promise<Opportunity> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
    });
    if (!opportunity) {
      throw new NotFoundException(`Oportunidad ${id} no encontrada.`);
    }
    return opportunity;
  }

  private recordVersion(quote: ProviderQuote, changeSummary: string) {
    return this.versionRepository.save(
      this.versionRepository.create({
        providerQuoteId: quote.id,
        versionNumber: quote.version,
        snapshot: {
          amount: quote.amount,
          currency: quote.currency,
          validUntil: quote.validUntil,
          status: quote.status,
        },
        changeSummary,
      }),
    );
  }
}
