import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogisticsOrder } from './entities/logistics-order.entity';
import { LogisticsOrderStatus } from './enums/order.enums';
import { ProviderQuote } from '../quotes/entities/provider-quote.entity';
import { QuoteRequest } from '../quotes/entities/quote-request.entity';
import {
  ProviderQuoteStatus,
  QuoteRequestStatus,
} from '../quotes/enums/quote.enums';

const ALLOWED_TRANSITIONS: Record<
  LogisticsOrderStatus,
  LogisticsOrderStatus[]
> = {
  [LogisticsOrderStatus.CONFIRMADA]: [
    LogisticsOrderStatus.EN_EJECUCION,
    LogisticsOrderStatus.CANCELADA,
  ],
  [LogisticsOrderStatus.EN_EJECUCION]: [
    LogisticsOrderStatus.COMPLETADA,
    LogisticsOrderStatus.CANCELADA,
  ],
  [LogisticsOrderStatus.COMPLETADA]: [],
  [LogisticsOrderStatus.CANCELADA]: [],
};

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(LogisticsOrder)
    private readonly orderRepository: Repository<LogisticsOrder>,
    @InjectRepository(ProviderQuote)
    private readonly providerQuoteRepository: Repository<ProviderQuote>,
    @InjectRepository(QuoteRequest)
    private readonly quoteRequestRepository: Repository<QuoteRequest>,
  ) {}

  /** §4.6 paso 6: confirmar orden a partir de una cotización enviada por el proveedor. */
  async createFromQuote(
    providerQuoteId: string,
    clientId: string,
  ): Promise<LogisticsOrder> {
    const quote = await this.providerQuoteRepository.findOne({
      where: { id: providerQuoteId },
      relations: { opportunity: { quoteRequest: true } },
    });
    if (!quote) {
      throw new NotFoundException(
        `Cotización ${providerQuoteId} no encontrada.`,
      );
    }
    if (quote.status !== ProviderQuoteStatus.ENVIADA) {
      throw new BadRequestException(
        'Solo se puede confirmar una cotización enviada.',
      );
    }

    const quoteRequest = quote.opportunity.quoteRequest;
    if (quoteRequest.clientId !== clientId) {
      throw new BadRequestException(
        'Solo el cliente que solicitó la cotización puede aceptarla.',
      );
    }

    const order = await this.orderRepository.save(
      this.orderRepository.create({
        quoteRequestId: quoteRequest.id,
        providerQuoteId: quote.id,
        clientId,
        providerProfileId: quote.providerProfileId,
        totalAmount: quote.amount,
        currency: quote.currency,
        status: LogisticsOrderStatus.CONFIRMADA,
        confirmedAt: new Date(),
      }),
    );

    quote.status = ProviderQuoteStatus.ACEPTADA;
    await this.providerQuoteRepository.save(quote);

    quoteRequest.status = QuoteRequestStatus.CERRADA;
    quoteRequest.closedAt = new Date();
    await this.quoteRequestRepository.save(quoteRequest);

    return order;
  }

  listForClient(clientId: string): Promise<LogisticsOrder[]> {
    return this.orderRepository.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });
  }

  listForProvider(providerProfileId: string): Promise<LogisticsOrder[]> {
    return this.orderRepository.find({
      where: { providerProfileId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<LogisticsOrder> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: { contract: { milestones: true, guarantees: true } },
    });
    if (!order) {
      throw new NotFoundException(`Orden ${id} no encontrada.`);
    }
    return order;
  }

  async startExecution(id: string): Promise<LogisticsOrder> {
    return this.transition(id, LogisticsOrderStatus.EN_EJECUCION);
  }

  /** Cierra la operación (§4.6 paso 27) — habilita reviews.relatedOrderId verificadas. */
  async complete(id: string): Promise<LogisticsOrder> {
    const order = await this.transition(id, LogisticsOrderStatus.COMPLETADA);
    order.completedAt = new Date();
    return this.orderRepository.save(order);
  }

  async cancel(id: string): Promise<LogisticsOrder> {
    return this.transition(id, LogisticsOrderStatus.CANCELADA);
  }

  private async transition(
    id: string,
    nextStatus: LogisticsOrderStatus,
  ): Promise<LogisticsOrder> {
    const order = await this.findOne(id);
    const allowed = ALLOWED_TRANSITIONS[order.status];
    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `No se puede pasar la orden de "${order.status}" a "${nextStatus}".`,
      );
    }
    order.status = nextStatus;
    return this.orderRepository.save(order);
  }
}
