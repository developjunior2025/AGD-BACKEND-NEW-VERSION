import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgdWarehouse } from './entities/agd-warehouse.entity';
import { AgdEntryRequest } from './entities/agd-entry-request.entity';
import { AgdReception } from './entities/agd-reception.entity';
import { AgdCustodyLot } from './entities/agd-custody-lot.entity';
import { AgdCustodyMovement } from './entities/agd-custody-movement.entity';
import { AgdOperationClosure } from './entities/agd-operation-closure.entity';
import {
  CustodyLotStatus,
  CustodyMovementType,
  EntryRequestStatus,
  ReceptionStatus,
} from './enums/agd.enums';
import { CreateWarehouseDto } from './dto/catalog.dto';
import { CompleteReceptionDto, CreateEntryRequestDto } from './dto/entry.dto';
import { AddCustodyMovementDto, CreateCustodyLotDto } from './dto/custody.dto';
import { CloseAgdOperationDto } from './dto/dispatch.dto';

@Injectable()
export class AgdCustodyService {
  constructor(
    @InjectRepository(AgdWarehouse)
    private readonly warehouseRepository: Repository<AgdWarehouse>,
    @InjectRepository(AgdEntryRequest)
    private readonly entryRequestRepository: Repository<AgdEntryRequest>,
    @InjectRepository(AgdReception)
    private readonly receptionRepository: Repository<AgdReception>,
    @InjectRepository(AgdCustodyLot)
    private readonly custodyLotRepository: Repository<AgdCustodyLot>,
    @InjectRepository(AgdCustodyMovement)
    private readonly custodyMovementRepository: Repository<AgdCustodyMovement>,
    @InjectRepository(AgdOperationClosure)
    private readonly closureRepository: Repository<AgdOperationClosure>,
  ) {}

  createWarehouse(dto: CreateWarehouseDto): Promise<AgdWarehouse> {
    return this.warehouseRepository.save(this.warehouseRepository.create(dto));
  }

  findAllWarehouses(): Promise<AgdWarehouse[]> {
    return this.warehouseRepository.find({ order: { name: 'ASC' } });
  }

  async createEntryRequest(
    clientId: string,
    dto: CreateEntryRequestDto,
  ): Promise<AgdEntryRequest> {
    return this.entryRequestRepository.save(
      this.entryRequestRepository.create({
        ...dto,
        clientId,
        requestedAt: new Date(),
      }),
    );
  }

  listEntryRequestsForClient(clientId: string): Promise<AgdEntryRequest[]> {
    return this.entryRequestRepository.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });
  }

  async findEntryRequest(id: string): Promise<AgdEntryRequest> {
    const entryRequest = await this.entryRequestRepository.findOne({
      where: { id },
      relations: { reception: { lots: true }, closure: true },
    });
    if (!entryRequest) {
      throw new NotFoundException(`Solicitud de ingreso ${id} no encontrada.`);
    }
    return entryRequest;
  }

  async scheduleEntry(id: string): Promise<AgdEntryRequest> {
    const entryRequest = await this.findEntryRequest(id);
    if (entryRequest.status !== EntryRequestStatus.SOLICITADO) {
      throw new BadRequestException(
        'Solo se puede programar una solicitud recién creada.',
      );
    }
    entryRequest.status = EntryRequestStatus.PROGRAMADO;
    return this.entryRequestRepository.save(entryRequest);
  }

  /** Preregistra la recepción (§6.4 paso 1-2). */
  async startReception(entryRequestId: string): Promise<AgdReception> {
    await this.findEntryRequest(entryRequestId);
    const existing = await this.receptionRepository.findOne({
      where: { entryRequestId },
    });
    if (existing) {
      return existing;
    }
    return this.receptionRepository.save(
      this.receptionRepository.create({ entryRequestId }),
    );
  }

  async completeReception(
    entryRequestId: string,
    receivedBy: string,
    dto: CompleteReceptionDto,
  ): Promise<AgdReception> {
    const reception = await this.receptionRepository.findOne({
      where: { entryRequestId },
    });
    if (!reception) {
      throw new NotFoundException(
        `No hay recepción iniciada para ${entryRequestId}.`,
      );
    }
    reception.status = ReceptionStatus.COMPLETADA;
    reception.receivedAt = new Date();
    reception.receivedBy = receivedBy;
    reception.notes = dto.notes ?? null;
    const saved = await this.receptionRepository.save(reception);

    await this.entryRequestRepository.update(
      { id: entryRequestId },
      { status: EntryRequestStatus.RECIBIDO },
    );

    return saved;
  }

  async createCustodyLot(
    receptionId: string,
    dto: CreateCustodyLotDto,
  ): Promise<AgdCustodyLot> {
    const reception = await this.receptionRepository.findOne({
      where: { id: receptionId },
    });
    if (!reception) {
      throw new NotFoundException(`Recepción ${receptionId} no encontrada.`);
    }
    const lot = await this.custodyLotRepository.save(
      this.custodyLotRepository.create({ ...dto, receptionId }),
    );

    await this.custodyMovementRepository.save(
      this.custodyMovementRepository.create({
        lotId: lot.id,
        movementType: CustodyMovementType.INGRESO,
        quantity: lot.quantity,
        occurredAt: new Date(),
        notes: 'Registro de custodia inicial.',
      }),
    );

    return lot;
  }

  async findCustodyLot(id: string): Promise<AgdCustodyLot> {
    const lot = await this.custodyLotRepository.findOne({
      where: { id },
      relations: { movements: true },
    });
    if (!lot) {
      throw new NotFoundException(`Lote ${id} no encontrado.`);
    }
    return lot;
  }

  async addCustodyMovement(
    lotId: string,
    dto: AddCustodyMovementDto,
  ): Promise<AgdCustodyMovement> {
    await this.findCustodyLot(lotId);
    return this.custodyMovementRepository.save(
      this.custodyMovementRepository.create({
        ...dto,
        lotId,
        occurredAt: new Date(),
      }),
    );
  }

  async markLotWithdrawn(lotId: string): Promise<AgdCustodyLot> {
    const lot = await this.findCustodyLot(lotId);
    lot.status = CustodyLotStatus.RETIRADO;
    return this.custodyLotRepository.save(lot);
  }

  async closeOperation(
    entryRequestId: string,
    closedBy: string,
    dto: CloseAgdOperationDto,
  ): Promise<AgdOperationClosure> {
    await this.findEntryRequest(entryRequestId);
    const existing = await this.closureRepository.findOne({
      where: { entryRequestId },
    });
    if (existing) {
      throw new BadRequestException('La operación ya fue cerrada.');
    }
    return this.closureRepository.save(
      this.closureRepository.create({
        entryRequestId,
        closedBy,
        closedAt: new Date(),
        summary: dto.summary ?? null,
      }),
    );
  }
}
