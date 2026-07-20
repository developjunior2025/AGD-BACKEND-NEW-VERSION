import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WmsPickingOrder } from './entities/wms-picking-order.entity';
import { WmsPackingOrder } from './entities/wms-packing-order.entity';
import { WmsDispatchOrder } from './entities/wms-dispatch-order.entity';
import { WmsDispatchEvidence } from './entities/wms-dispatch-evidence.entity';
import { WmsTask } from './entities/wms-task.entity';
import {
  DispatchOrderStatus,
  OrderStatus,
  WmsTaskStatus,
} from './enums/wms.enums';
import {
  AddDispatchEvidenceDto,
  CreateDispatchOrderDto,
  CreatePackingOrderDto,
  CreatePickingOrderDto,
  CreateTaskDto,
} from './dto/fulfillment.dto';

@Injectable()
export class WmsFulfillmentService {
  constructor(
    @InjectRepository(WmsPickingOrder)
    private readonly pickingOrderRepository: Repository<WmsPickingOrder>,
    @InjectRepository(WmsPackingOrder)
    private readonly packingOrderRepository: Repository<WmsPackingOrder>,
    @InjectRepository(WmsDispatchOrder)
    private readonly dispatchOrderRepository: Repository<WmsDispatchOrder>,
    @InjectRepository(WmsDispatchEvidence)
    private readonly dispatchEvidenceRepository: Repository<WmsDispatchEvidence>,
    @InjectRepository(WmsTask)
    private readonly taskRepository: Repository<WmsTask>,
  ) {}

  createPickingOrder(
    requestedBy: string,
    dto: CreatePickingOrderDto,
  ): Promise<WmsPickingOrder> {
    return this.pickingOrderRepository.save(
      this.pickingOrderRepository.create({
        ...dto,
        requestedBy,
        requestedAt: new Date(),
      }),
    );
  }

  async completePickingOrder(id: string): Promise<WmsPickingOrder> {
    const order = await this.pickingOrderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Orden de picking ${id} no encontrada.`);
    }
    order.status = OrderStatus.COMPLETADA;
    return this.pickingOrderRepository.save(order);
  }

  createPackingOrder(dto: CreatePackingOrderDto): Promise<WmsPackingOrder> {
    return this.packingOrderRepository.save(
      this.packingOrderRepository.create(dto),
    );
  }

  async completePackingOrder(
    id: string,
    packedBy: string,
  ): Promise<WmsPackingOrder> {
    const order = await this.packingOrderRepository.findOne({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Orden de packing ${id} no encontrada.`);
    }
    order.status = OrderStatus.COMPLETADA;
    order.packedBy = packedBy;
    order.packedAt = new Date();
    return this.packingOrderRepository.save(order);
  }

  createDispatchOrder(dto: CreateDispatchOrderDto): Promise<WmsDispatchOrder> {
    return this.dispatchOrderRepository.save(
      this.dispatchOrderRepository.create(dto),
    );
  }

  async findDispatchOrder(id: string): Promise<WmsDispatchOrder> {
    const order = await this.dispatchOrderRepository.findOne({
      where: { id },
      relations: { evidence: true },
    });
    if (!order) {
      throw new NotFoundException(`Orden de despacho ${id} no encontrada.`);
    }
    return order;
  }

  async completeDispatchChecklist(id: string): Promise<WmsDispatchOrder> {
    const order = await this.findDispatchOrder(id);
    order.checklistCompleted = true;
    order.status = DispatchOrderStatus.PREPARADO;
    return this.dispatchOrderRepository.save(order);
  }

  async dispatch(id: string): Promise<WmsDispatchOrder> {
    const order = await this.findDispatchOrder(id);
    order.status = DispatchOrderStatus.DESPACHADO;
    order.dispatchedAt = new Date();
    return this.dispatchOrderRepository.save(order);
  }

  async addDispatchEvidence(
    dispatchOrderId: string,
    uploadedBy: string,
    dto: AddDispatchEvidenceDto,
  ): Promise<WmsDispatchEvidence> {
    await this.findDispatchOrder(dispatchOrderId);
    return this.dispatchEvidenceRepository.save(
      this.dispatchEvidenceRepository.create({
        ...dto,
        dispatchOrderId,
        uploadedBy,
      }),
    );
  }

  createTask(dto: CreateTaskDto): Promise<WmsTask> {
    return this.taskRepository.save(this.taskRepository.create(dto));
  }

  listTasksForAssignee(assignedTo: string): Promise<WmsTask[]> {
    return this.taskRepository.find({
      where: { assignedTo },
      order: { createdAt: 'DESC' },
    });
  }

  async completeTask(id: string): Promise<WmsTask> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Tarea ${id} no encontrada.`);
    }
    task.status = WmsTaskStatus.COMPLETADA;
    return this.taskRepository.save(task);
  }
}
