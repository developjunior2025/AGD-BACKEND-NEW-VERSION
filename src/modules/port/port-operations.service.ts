import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortContainer } from './entities/port-container.entity';
import { PortDischargeOrder } from './entities/port-discharge-order.entity';
import { PortDischargeEvent } from './entities/port-discharge-event.entity';
import { PortYardSlot } from './entities/port-yard-slot.entity';
import { PortInternalMovement } from './entities/port-internal-movement.entity';
import { PortGateEvent } from './entities/port-gate-event.entity';
import { PortReleaseAuthorization } from './entities/port-release-authorization.entity';
import {
  ContainerStatus,
  DischargeOrderStatus,
  GateEventType,
  YardSlotStatus,
} from './enums/port.enums';
import {
  AddDischargeEventDto,
  AuthorizeContainerReleaseDto,
  CreateContainerDto,
  CreateDischargeOrderDto,
  MoveContainerDto,
  RegisterGateEventDto,
} from './dto/operations.dto';

@Injectable()
export class PortOperationsService {
  constructor(
    @InjectRepository(PortContainer)
    private readonly containerRepository: Repository<PortContainer>,
    @InjectRepository(PortDischargeOrder)
    private readonly dischargeOrderRepository: Repository<PortDischargeOrder>,
    @InjectRepository(PortDischargeEvent)
    private readonly dischargeEventRepository: Repository<PortDischargeEvent>,
    @InjectRepository(PortYardSlot)
    private readonly yardSlotRepository: Repository<PortYardSlot>,
    @InjectRepository(PortInternalMovement)
    private readonly internalMovementRepository: Repository<PortInternalMovement>,
    @InjectRepository(PortGateEvent)
    private readonly gateEventRepository: Repository<PortGateEvent>,
    @InjectRepository(PortReleaseAuthorization)
    private readonly releaseRepository: Repository<PortReleaseAuthorization>,
  ) {}

  createContainer(dto: CreateContainerDto): Promise<PortContainer> {
    return this.containerRepository.save(this.containerRepository.create(dto));
  }

  async findContainer(id: string): Promise<PortContainer> {
    const container = await this.containerRepository.findOne({ where: { id } });
    if (!container) {
      throw new NotFoundException(`Contenedor ${id} no encontrado.`);
    }
    return container;
  }

  createDischargeOrder(
    manifestId: string,
    dto: CreateDischargeOrderDto,
  ): Promise<PortDischargeOrder> {
    return this.dischargeOrderRepository.save(
      this.dischargeOrderRepository.create({ manifestId, ...dto }),
    );
  }

  /** Registra el parte de descarga y marca el contenedor como descargado. */
  async addDischargeEvent(
    dischargeOrderId: string,
    dto: AddDischargeEventDto,
  ): Promise<PortDischargeEvent> {
    const order = await this.dischargeOrderRepository.findOne({
      where: { id: dischargeOrderId },
    });
    if (!order) {
      throw new NotFoundException(
        `Orden de descarga ${dischargeOrderId} no encontrada.`,
      );
    }

    const event = await this.dischargeEventRepository.save(
      this.dischargeEventRepository.create({
        ...dto,
        dischargeOrderId,
        eventAt: new Date(),
      }),
    );

    if (dto.containerId) {
      await this.containerRepository.update(
        { id: dto.containerId },
        { currentStatus: ContainerStatus.DESCARGADO },
      );
    }

    order.status = DischargeOrderStatus.EN_PROCESO;
    await this.dischargeOrderRepository.save(order);

    return event;
  }

  async completeDischargeOrder(id: string): Promise<PortDischargeOrder> {
    const order = await this.dischargeOrderRepository.findOne({
      where: { id },
    });
    if (!order) {
      throw new NotFoundException(`Orden de descarga ${id} no encontrada.`);
    }
    order.status = DischargeOrderStatus.COMPLETADA;
    return this.dischargeOrderRepository.save(order);
  }

  /** Mueve un contenedor a un slot de patio, liberando el slot anterior. */
  async moveContainer(dto: MoveContainerDto): Promise<PortInternalMovement> {
    const toSlot = await this.yardSlotRepository.findOne({
      where: { id: dto.toSlotId },
    });
    if (!toSlot) {
      throw new NotFoundException(
        `Slot de destino ${dto.toSlotId} no encontrado.`,
      );
    }
    if (toSlot.status === YardSlotStatus.OCUPADO) {
      throw new BadRequestException('El slot de destino ya está ocupado.');
    }

    if (dto.fromSlotId) {
      await this.yardSlotRepository.update(
        { id: dto.fromSlotId },
        { status: YardSlotStatus.LIBRE, containerId: null },
      );
    }

    toSlot.status = YardSlotStatus.OCUPADO;
    toSlot.containerId = dto.containerId;
    await this.yardSlotRepository.save(toSlot);

    await this.containerRepository.update(
      { id: dto.containerId },
      { currentStatus: ContainerStatus.EN_PATIO },
    );

    return this.internalMovementRepository.save(
      this.internalMovementRepository.create({ ...dto, movedAt: new Date() }),
    );
  }

  /** Registra gate in/out y actualiza el estado del contenedor si es salida. */
  async registerGateEvent(dto: RegisterGateEventDto): Promise<PortGateEvent> {
    const event = await this.gateEventRepository.save(
      this.gateEventRepository.create({ ...dto, occurredAt: new Date() }),
    );

    if (dto.eventType === GateEventType.GATE_OUT) {
      await this.containerRepository.update(
        { id: dto.containerId },
        { currentStatus: ContainerStatus.RETIRADO },
      );
    }

    return event;
  }

  async authorizeRelease(
    authorizedBy: string,
    dto: AuthorizeContainerReleaseDto,
  ): Promise<PortReleaseAuthorization> {
    await this.findContainer(dto.containerId);
    return this.releaseRepository.save(
      this.releaseRepository.create({
        ...dto,
        authorizedBy,
        authorizedAt: new Date(),
      }),
    );
  }
}
