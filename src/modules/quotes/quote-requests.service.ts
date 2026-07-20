import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { QuoteRequest } from './entities/quote-request.entity';
import { QuoteRequestItem } from './entities/quote-request-item.entity';
import { Opportunity } from './entities/opportunity.entity';
import { ProviderQuote } from './entities/provider-quote.entity';
import { ProviderComparison } from './entities/provider-comparison.entity';
import { QuoteRequestStatus } from './enums/quote.enums';
import { CreateQuoteRequestDto } from './dto/create-quote-request.dto';
import { SendToProvidersDto } from './dto/send-to-providers.dto';
import { CreateComparisonDto } from './dto/create-comparison.dto';

@Injectable()
export class QuoteRequestsService {
  constructor(
    @InjectRepository(QuoteRequest)
    private readonly quoteRequestRepository: Repository<QuoteRequest>,
    @InjectRepository(QuoteRequestItem)
    private readonly itemRepository: Repository<QuoteRequestItem>,
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
    @InjectRepository(ProviderQuote)
    private readonly providerQuoteRepository: Repository<ProviderQuote>,
    @InjectRepository(ProviderComparison)
    private readonly comparisonRepository: Repository<ProviderComparison>,
  ) {}

  async create(
    clientId: string,
    dto: CreateQuoteRequestDto,
  ): Promise<QuoteRequest> {
    const { items, ...rest } = dto;
    const quoteRequest = await this.quoteRequestRepository.save(
      this.quoteRequestRepository.create({ ...rest, clientId }),
    );

    if (items?.length) {
      await this.itemRepository.save(
        items.map((item) =>
          this.itemRepository.create({
            ...item,
            quoteRequestId: quoteRequest.id,
          }),
        ),
      );
    }

    return quoteRequest;
  }

  listForClient(clientId: string): Promise<QuoteRequest[]> {
    return this.quoteRequestRepository.find({
      where: { clientId },
      relations: { items: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<QuoteRequest> {
    const quoteRequest = await this.quoteRequestRepository.findOne({
      where: { id },
      relations: { items: true, opportunities: true },
    });
    if (!quoteRequest) {
      throw new NotFoundException(
        `Solicitud de cotización ${id} no encontrada.`,
      );
    }
    return quoteRequest;
  }

  /** Envía la solicitud a proveedores seleccionados creando su oportunidad (§6.7). */
  async sendToProviders(
    quoteRequestId: string,
    dto: SendToProvidersDto,
  ): Promise<Opportunity[]> {
    const quoteRequest = await this.findOne(quoteRequestId);
    if (quoteRequest.status === QuoteRequestStatus.CERRADA) {
      throw new BadRequestException('La solicitud ya está cerrada.');
    }

    const opportunities = await this.opportunityRepository.save(
      dto.providerProfileIds.map((providerProfileId) =>
        this.opportunityRepository.create({
          quoteRequestId,
          providerProfileId,
        }),
      ),
    );

    if (quoteRequest.status === QuoteRequestStatus.ABIERTA) {
      quoteRequest.status = QuoteRequestStatus.EN_COTIZACION;
      await this.quoteRequestRepository.save(quoteRequest);
    }

    return opportunities;
  }

  async cancel(quoteRequestId: string): Promise<QuoteRequest> {
    const quoteRequest = await this.findOne(quoteRequestId);
    if (quoteRequest.status === QuoteRequestStatus.CERRADA) {
      throw new BadRequestException('La solicitud ya está cerrada.');
    }
    quoteRequest.status = QuoteRequestStatus.CANCELADA;
    quoteRequest.closedAt = new Date();
    return this.quoteRequestRepository.save(quoteRequest);
  }

  async compare(
    userId: string,
    dto: CreateComparisonDto,
  ): Promise<ProviderComparison> {
    const quotes = await this.providerQuoteRepository.find({
      where: { id: In(dto.comparedQuoteIds) },
      relations: {
        opportunity: true,
        technicalProposal: true,
        economicProposal: true,
      },
    });
    if (quotes.length !== dto.comparedQuoteIds.length) {
      throw new NotFoundException(
        'Alguna de las cotizaciones a comparar no existe.',
      );
    }

    const quoteRequestId = quotes[0].opportunity?.quoteRequestId;
    if (!quoteRequestId) {
      throw new BadRequestException(
        'No se pudo determinar la solicitud de cotización.',
      );
    }

    return this.comparisonRepository.save(
      this.comparisonRepository.create({
        quoteRequestId,
        userId,
        comparedQuoteIds: dto.comparedQuoteIds,
        notes: dto.notes ?? null,
      }),
    );
  }
}
