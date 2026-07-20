import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportWaybill } from './entities/transport-waybill.entity';
import { TransportDeliveryNote } from './entities/transport-delivery-note.entity';
import { TransportIncident } from './entities/transport-incident.entity';
import { TransportProofOfDelivery } from './entities/transport-proof-of-delivery.entity';
import { TransportTripExpense } from './entities/transport-trip-expense.entity';
import { TransportTripSettlement } from './entities/transport-trip-settlement.entity';
import { TransportOperationClosure } from './entities/transport-operation-closure.entity';
import { TripSettlementStatus } from './enums/transport.enums';
import {
  AddIncidentDto,
  AddTripExpenseDto,
  CloseTripDto,
  CreateDeliveryNoteDto,
  CreateWaybillDto,
  RecordPodDto,
} from './dto/documents.dto';

@Injectable()
export class TransportDocumentsService {
  constructor(
    @InjectRepository(TransportWaybill)
    private readonly waybillRepository: Repository<TransportWaybill>,
    @InjectRepository(TransportDeliveryNote)
    private readonly deliveryNoteRepository: Repository<TransportDeliveryNote>,
    @InjectRepository(TransportIncident)
    private readonly incidentRepository: Repository<TransportIncident>,
    @InjectRepository(TransportProofOfDelivery)
    private readonly podRepository: Repository<TransportProofOfDelivery>,
    @InjectRepository(TransportTripExpense)
    private readonly expenseRepository: Repository<TransportTripExpense>,
    @InjectRepository(TransportTripSettlement)
    private readonly settlementRepository: Repository<TransportTripSettlement>,
    @InjectRepository(TransportOperationClosure)
    private readonly closureRepository: Repository<TransportOperationClosure>,
  ) {}

  createWaybill(
    tripId: string,
    dto: CreateWaybillDto,
  ): Promise<TransportWaybill> {
    return this.waybillRepository.save(
      this.waybillRepository.create({ ...dto, tripId, issuedAt: new Date() }),
    );
  }

  createDeliveryNote(
    tripId: string,
    dto: CreateDeliveryNoteDto,
  ): Promise<TransportDeliveryNote> {
    return this.deliveryNoteRepository.save(
      this.deliveryNoteRepository.create({
        ...dto,
        tripId,
        issuedAt: new Date(),
      }),
    );
  }

  addIncident(tripId: string, dto: AddIncidentDto): Promise<TransportIncident> {
    return this.incidentRepository.save(
      this.incidentRepository.create({
        ...dto,
        tripId,
        occurredAt: new Date(),
      }),
    );
  }

  /** Registra la prueba de entrega (§6.6 paso 7). */
  recordProofOfDelivery(
    tripId: string,
    dto: RecordPodDto,
  ): Promise<TransportProofOfDelivery> {
    return this.podRepository.save(
      this.podRepository.create({ ...dto, tripId, deliveredAt: new Date() }),
    );
  }

  addExpense(
    tripId: string,
    dto: AddTripExpenseDto,
  ): Promise<TransportTripExpense> {
    return this.expenseRepository.save(
      this.expenseRepository.create({ ...dto, tripId, incurredAt: new Date() }),
    );
  }

  /** Liquida el viaje sumando los gastos registrados (§6.6 paso 8). */
  async settleTrip(tripId: string): Promise<TransportTripSettlement> {
    const expenses = await this.expenseRepository.find({ where: { tripId } });
    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );

    let settlement = await this.settlementRepository.findOne({
      where: { tripId },
    });
    if (!settlement) {
      settlement = this.settlementRepository.create({ tripId });
    }
    settlement.totalExpenses = totalExpenses.toFixed(2);
    settlement.netAmount = (
      Number(settlement.totalRevenue ?? 0) - totalExpenses
    ).toFixed(2);
    settlement.status = TripSettlementStatus.LIQUIDADO;
    settlement.settledAt = new Date();

    return this.settlementRepository.save(settlement);
  }

  async closeTrip(
    tripId: string,
    closedBy: string,
    dto: CloseTripDto,
  ): Promise<TransportOperationClosure> {
    const settlement = await this.settlementRepository.findOne({
      where: { tripId },
    });
    if (!settlement || settlement.status !== TripSettlementStatus.LIQUIDADO) {
      throw new BadRequestException(
        'El viaje debe estar liquidado antes de cerrarse.',
      );
    }

    const existing = await this.closureRepository.findOne({
      where: { tripId },
    });
    if (existing) {
      throw new BadRequestException('El viaje ya fue cerrado.');
    }

    return this.closureRepository.save(
      this.closureRepository.create({
        tripId,
        closedBy,
        closedAt: new Date(),
        summary: dto.summary ?? null,
      }),
    );
  }
}
