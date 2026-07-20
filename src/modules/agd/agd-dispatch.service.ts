import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgdPickingOrder } from './entities/agd-picking-order.entity';
import { AgdDispatchOrder } from './entities/agd-dispatch-order.entity';
import { AgdReleaseAuthorization } from './entities/agd-release-authorization.entity';
import { AgdDeliveryRecord } from './entities/agd-delivery-record.entity';
import { DispatchOrderStatus, PickingOrderStatus } from './enums/agd.enums';
import {
  AuthorizeAgdReleaseDto,
  CreateDispatchOrderDto,
  CreatePickingOrderDto,
  RecordDeliveryDto,
} from './dto/dispatch.dto';

@Injectable()
export class AgdDispatchService {
  constructor(
    @InjectRepository(AgdPickingOrder)
    private readonly pickingOrderRepository: Repository<AgdPickingOrder>,
    @InjectRepository(AgdDispatchOrder)
    private readonly dispatchOrderRepository: Repository<AgdDispatchOrder>,
    @InjectRepository(AgdReleaseAuthorization)
    private readonly releaseRepository: Repository<AgdReleaseAuthorization>,
    @InjectRepository(AgdDeliveryRecord)
    private readonly deliveryRepository: Repository<AgdDeliveryRecord>,
  ) {}

  createPickingOrder(
    requestedBy: string,
    dto: CreatePickingOrderDto,
  ): Promise<AgdPickingOrder> {
    return this.pickingOrderRepository.save(
      this.pickingOrderRepository.create({
        ...dto,
        requestedBy,
        requestedAt: new Date(),
      }),
    );
  }

  async completePickingOrder(id: string): Promise<AgdPickingOrder> {
    const order = await this.pickingOrderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Orden de picking ${id} no encontrada.`);
    }
    order.status = PickingOrderStatus.COMPLETADA;
    return this.pickingOrderRepository.save(order);
  }

  createDispatchOrder(dto: CreateDispatchOrderDto): Promise<AgdDispatchOrder> {
    return this.dispatchOrderRepository.save(
      this.dispatchOrderRepository.create(dto),
    );
  }

  async dispatch(id: string): Promise<AgdDispatchOrder> {
    const order = await this.dispatchOrderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Orden de despacho ${id} no encontrada.`);
    }
    order.status = DispatchOrderStatus.DESPACHADO;
    order.dispatchedAt = new Date();
    return this.dispatchOrderRepository.save(order);
  }

  authorizeRelease(
    authorizedBy: string,
    dto: AuthorizeAgdReleaseDto,
  ): Promise<AgdReleaseAuthorization> {
    return this.releaseRepository.save(
      this.releaseRepository.create({
        ...dto,
        authorizedBy,
        authorizedAt: new Date(),
      }),
    );
  }

  async recordDelivery(
    dispatchOrderId: string,
    dto: RecordDeliveryDto,
  ): Promise<AgdDeliveryRecord> {
    const order = await this.dispatchOrderRepository.findOne({
      where: { id: dispatchOrderId },
    });
    if (!order) {
      throw new NotFoundException(
        `Orden de despacho ${dispatchOrderId} no encontrada.`,
      );
    }
    return this.deliveryRepository.save(
      this.deliveryRepository.create({
        ...dto,
        dispatchOrderId,
        deliveredAt: new Date(),
      }),
    );
  }
}
