import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortVoyage } from './entities/port-voyage.entity';
import { PortArrival } from './entities/port-arrival.entity';
import { PortBerthRequest } from './entities/port-berth-request.entity';
import { PortBerthAssignment } from './entities/port-berth-assignment.entity';
import { PortOperatingWindow } from './entities/port-operating-window.entity';
import { PortOperationClosure } from './entities/port-operation-closure.entity';
import {
  ArrivalStatus,
  BerthRequestStatus,
  OperatingWindowStatus,
} from './enums/port.enums';
import {
  AssignBerthDto,
  CloseOperationDto,
  CreateOperatingWindowDto,
  CreateVoyageDto,
  RequestArrivalDto,
  RequestBerthDto,
} from './dto/voyage.dto';

@Injectable()
export class PortVoyagesService {
  constructor(
    @InjectRepository(PortVoyage)
    private readonly voyageRepository: Repository<PortVoyage>,
    @InjectRepository(PortArrival)
    private readonly arrivalRepository: Repository<PortArrival>,
    @InjectRepository(PortBerthRequest)
    private readonly berthRequestRepository: Repository<PortBerthRequest>,
    @InjectRepository(PortBerthAssignment)
    private readonly berthAssignmentRepository: Repository<PortBerthAssignment>,
    @InjectRepository(PortOperatingWindow)
    private readonly operatingWindowRepository: Repository<PortOperatingWindow>,
    @InjectRepository(PortOperationClosure)
    private readonly closureRepository: Repository<PortOperationClosure>,
  ) {}

  create(dto: CreateVoyageDto): Promise<PortVoyage> {
    return this.voyageRepository.save(this.voyageRepository.create(dto));
  }

  async findOne(id: string): Promise<PortVoyage> {
    const voyage = await this.voyageRepository.findOne({
      where: { id },
      relations: {
        arrival: { berthRequest: { assignment: true } },
        manifests: true,
        closure: true,
      },
    });
    if (!voyage) {
      throw new NotFoundException(`Escala ${id} no encontrada.`);
    }
    return voyage;
  }

  findAll(): Promise<PortVoyage[]> {
    return this.voyageRepository.find({ order: { createdAt: 'DESC' } });
  }

  async requestArrival(
    voyageId: string,
    dto: RequestArrivalDto,
  ): Promise<PortArrival> {
    await this.findOne(voyageId);
    return this.arrivalRepository.save(
      this.arrivalRepository.create({ voyageId, ...dto }),
    );
  }

  async confirmArrival(voyageId: string): Promise<PortArrival> {
    const arrival = await this.getArrival(voyageId);
    if (arrival.status !== ArrivalStatus.SOLICITADO) {
      throw new BadRequestException('El arribo ya fue confirmado.');
    }
    arrival.status = ArrivalStatus.CONFIRMADO;
    arrival.confirmedAt = new Date();
    return this.arrivalRepository.save(arrival);
  }

  async registerActualArrival(voyageId: string): Promise<PortArrival> {
    const arrival = await this.getArrival(voyageId);
    arrival.status = ArrivalStatus.EN_PUERTO;
    arrival.actualArrivalAt = new Date();
    return this.arrivalRepository.save(arrival);
  }

  private async getArrival(voyageId: string): Promise<PortArrival> {
    const arrival = await this.arrivalRepository.findOne({
      where: { voyageId },
    });
    if (!arrival) {
      throw new NotFoundException(
        `No hay aviso de arribo registrado para la escala ${voyageId}.`,
      );
    }
    return arrival;
  }

  async requestBerth(
    voyageId: string,
    dto: RequestBerthDto,
  ): Promise<PortBerthRequest> {
    const arrival = await this.getArrival(voyageId);
    return this.berthRequestRepository.save(
      this.berthRequestRepository.create({ arrivalId: arrival.id, ...dto }),
    );
  }

  async assignBerth(
    voyageId: string,
    dto: AssignBerthDto,
  ): Promise<PortBerthAssignment> {
    const arrival = await this.getArrival(voyageId);
    const berthRequest = await this.berthRequestRepository.findOne({
      where: { arrivalId: arrival.id },
    });
    if (!berthRequest) {
      throw new NotFoundException(
        'No hay solicitud de atraque para esta escala.',
      );
    }

    const assignment = await this.berthAssignmentRepository.save(
      this.berthAssignmentRepository.create({
        berthRequestId: berthRequest.id,
        ...dto,
      }),
    );

    berthRequest.status = BerthRequestStatus.ASIGNADO;
    await this.berthRequestRepository.save(berthRequest);

    return assignment;
  }

  async addOperatingWindow(
    berthAssignmentId: string,
    dto: CreateOperatingWindowDto,
  ): Promise<PortOperatingWindow> {
    const assignment = await this.berthAssignmentRepository.findOne({
      where: { id: berthAssignmentId },
    });
    if (!assignment) {
      throw new NotFoundException(
        `Asignación de muelle ${berthAssignmentId} no encontrada.`,
      );
    }
    return this.operatingWindowRepository.save(
      this.operatingWindowRepository.create({ berthAssignmentId, ...dto }),
    );
  }

  async startOperatingWindow(id: string): Promise<PortOperatingWindow> {
    return this.transitionWindow(id, OperatingWindowStatus.EN_CURSO);
  }

  async finishOperatingWindow(id: string): Promise<PortOperatingWindow> {
    return this.transitionWindow(id, OperatingWindowStatus.FINALIZADA);
  }

  private async transitionWindow(
    id: string,
    status: OperatingWindowStatus,
  ): Promise<PortOperatingWindow> {
    const window = await this.operatingWindowRepository.findOne({
      where: { id },
    });
    if (!window) {
      throw new NotFoundException(`Ventana operativa ${id} no encontrada.`);
    }
    window.status = status;
    return this.operatingWindowRepository.save(window);
  }

  async closeOperation(
    voyageId: string,
    closedBy: string,
    dto: CloseOperationDto,
  ): Promise<PortOperationClosure> {
    await this.findOne(voyageId);
    const existing = await this.closureRepository.findOne({
      where: { voyageId },
    });
    if (existing) {
      throw new BadRequestException('La escala ya fue cerrada.');
    }
    return this.closureRepository.save(
      this.closureRepository.create({
        voyageId,
        closedBy,
        closedAt: new Date(),
        summary: dto.summary ?? null,
      }),
    );
  }
}
