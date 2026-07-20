import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { WmsReceipt } from './entities/wms-receipt.entity';
import { WmsReceiptItem } from './entities/wms-receipt-item.entity';
import { WmsInventoryBalance } from './entities/wms-inventory-balance.entity';
import { WmsInventoryMovement } from './entities/wms-inventory-movement.entity';
import { WmsInventoryReservation } from './entities/wms-inventory-reservation.entity';
import { WmsCycleCount } from './entities/wms-cycle-count.entity';
import { WmsInventoryAdjustment } from './entities/wms-inventory-adjustment.entity';
import { WmsPutawayRule } from './entities/wms-putaway-rule.entity';
import { WmsPickingRule } from './entities/wms-picking-rule.entity';
import {
  CycleCountStatus,
  InventoryMovementType,
  ReceiptStatus,
  ReservationStatus,
} from './enums/wms.enums';
import {
  AddReceiptItemDto,
  CreateReceiptDto,
  ReceiveItemDto,
} from './dto/receipt.dto';
import {
  CreateAdjustmentDto,
  CreateCycleCountDto,
  CreateReservationDto,
  RecordCountDto,
} from './dto/inventory.dto';
import { CreatePickingRuleDto, CreatePutawayRuleDto } from './dto/rules.dto';

@Injectable()
export class WmsInventoryService {
  constructor(
    @InjectRepository(WmsReceipt)
    private readonly receiptRepository: Repository<WmsReceipt>,
    @InjectRepository(WmsReceiptItem)
    private readonly receiptItemRepository: Repository<WmsReceiptItem>,
    @InjectRepository(WmsInventoryBalance)
    private readonly balanceRepository: Repository<WmsInventoryBalance>,
    @InjectRepository(WmsInventoryMovement)
    private readonly movementRepository: Repository<WmsInventoryMovement>,
    @InjectRepository(WmsInventoryReservation)
    private readonly reservationRepository: Repository<WmsInventoryReservation>,
    @InjectRepository(WmsCycleCount)
    private readonly cycleCountRepository: Repository<WmsCycleCount>,
    @InjectRepository(WmsInventoryAdjustment)
    private readonly adjustmentRepository: Repository<WmsInventoryAdjustment>,
    @InjectRepository(WmsPutawayRule)
    private readonly putawayRuleRepository: Repository<WmsPutawayRule>,
    @InjectRepository(WmsPickingRule)
    private readonly pickingRuleRepository: Repository<WmsPickingRule>,
  ) {}

  createReceipt(dto: CreateReceiptDto): Promise<WmsReceipt> {
    return this.receiptRepository.save(this.receiptRepository.create(dto));
  }

  async findReceipt(id: string): Promise<WmsReceipt> {
    const receipt = await this.receiptRepository.findOne({
      where: { id },
      relations: { items: true },
    });
    if (!receipt) {
      throw new NotFoundException(`Recepción ${id} no encontrada.`);
    }
    return receipt;
  }

  async addReceiptItem(
    receiptId: string,
    dto: AddReceiptItemDto,
  ): Promise<WmsReceiptItem> {
    await this.findReceipt(receiptId);
    return this.receiptItemRepository.save(
      this.receiptItemRepository.create({ ...dto, receiptId }),
    );
  }

  /** Recibe físicamente un ítem: registra el kardex y actualiza el saldo (§6.5 "Recepciones"). */
  async receiveItem(
    itemId: string,
    dto: ReceiveItemDto,
  ): Promise<WmsReceiptItem> {
    const item = await this.receiptItemRepository.findOne({
      where: { id: itemId },
    });
    if (!item) {
      throw new NotFoundException(
        `Renglón de recepción ${itemId} no encontrado.`,
      );
    }

    item.receivedQuantity = dto.receivedQuantity;
    item.locationId = dto.locationId;
    const saved = await this.receiptItemRepository.save(item);

    await this.adjustBalance(
      item.skuId,
      dto.locationId,
      item.lotId,
      Number(dto.receivedQuantity),
    );
    await this.movementRepository.save(
      this.movementRepository.create({
        skuId: item.skuId,
        toLocationId: dto.locationId,
        movementType: InventoryMovementType.RECEPCION,
        quantity: dto.receivedQuantity,
        occurredAt: new Date(),
        reference: item.receiptId,
      }),
    );

    return saved;
  }

  async completeReceipt(id: string): Promise<WmsReceipt> {
    const receipt = await this.findReceipt(id);
    receipt.status = ReceiptStatus.COMPLETADA;
    receipt.receivedAt = new Date();
    return this.receiptRepository.save(receipt);
  }

  findBalances(skuId: string): Promise<WmsInventoryBalance[]> {
    return this.balanceRepository.find({ where: { skuId } });
  }

  async createReservation(
    dto: CreateReservationDto,
  ): Promise<WmsInventoryReservation> {
    const reservation = await this.reservationRepository.save(
      this.reservationRepository.create(dto),
    );

    if (dto.locationId) {
      const balance = await this.getBalanceRow(dto.skuId, dto.locationId, null);
      balance.reservedQuantity = (
        Number(balance.reservedQuantity) + Number(dto.quantity)
      ).toFixed(3);
      await this.balanceRepository.save(balance);
    }

    return reservation;
  }

  async releaseReservation(id: string): Promise<WmsInventoryReservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new NotFoundException(`Reserva ${id} no encontrada.`);
    }
    reservation.status = ReservationStatus.LIBERADA;
    return this.reservationRepository.save(reservation);
  }

  createCycleCount(dto: CreateCycleCountDto): Promise<WmsCycleCount> {
    return this.cycleCountRepository.save(
      this.cycleCountRepository.create(dto),
    );
  }

  /** Registra el conteo y genera un ajuste automático si hay discrepancia (§4.4.4 "Ajustes de inventario"). */
  async recordCount(
    id: string,
    countedBy: string,
    dto: RecordCountDto,
  ): Promise<WmsCycleCount> {
    const count = await this.cycleCountRepository.findOne({ where: { id } });
    if (!count) {
      throw new NotFoundException(`Conteo cíclico ${id} no encontrado.`);
    }
    count.countedQuantity = dto.countedQuantity;
    count.countedBy = countedBy;
    count.countedAt = new Date();
    count.status = CycleCountStatus.COMPLETADO;
    const saved = await this.cycleCountRepository.save(count);

    const expected = Number(count.expectedQuantity ?? 0);
    const counted = Number(dto.countedQuantity);
    if (expected !== counted) {
      const delta = counted - expected;
      await this.adjustmentRepository.save(
        this.adjustmentRepository.create({
          skuId: count.skuId,
          locationId: count.locationId,
          quantityDelta: delta.toFixed(3),
          reason: `Ajuste automático por discrepancia en conteo cíclico ${id}.`,
          adjustedBy: countedBy,
        }),
      );
      await this.adjustBalance(count.skuId, count.locationId, null, delta);
    }

    return saved;
  }

  async createAdjustment(
    adjustedBy: string,
    dto: CreateAdjustmentDto,
  ): Promise<WmsInventoryAdjustment> {
    const adjustment = await this.adjustmentRepository.save(
      this.adjustmentRepository.create({ ...dto, adjustedBy }),
    );
    await this.adjustBalance(
      dto.skuId,
      dto.locationId,
      null,
      Number(dto.quantityDelta),
    );
    return adjustment;
  }

  createPutawayRule(dto: CreatePutawayRuleDto): Promise<WmsPutawayRule> {
    return this.putawayRuleRepository.save(
      this.putawayRuleRepository.create(dto),
    );
  }

  findAllPutawayRules(): Promise<WmsPutawayRule[]> {
    return this.putawayRuleRepository.find({ order: { priority: 'ASC' } });
  }

  createPickingRule(dto: CreatePickingRuleDto): Promise<WmsPickingRule> {
    return this.pickingRuleRepository.save(
      this.pickingRuleRepository.create(dto),
    );
  }

  findAllPickingRules(): Promise<WmsPickingRule[]> {
    return this.pickingRuleRepository.find();
  }

  private async getBalanceRow(
    skuId: string,
    locationId: string,
    lotId: string | null,
  ): Promise<WmsInventoryBalance> {
    let balance = await this.balanceRepository.findOne({
      where: { skuId, locationId, lotId: lotId ?? IsNull() },
    });
    if (!balance) {
      balance = this.balanceRepository.create({
        skuId,
        locationId,
        lotId,
        quantity: '0',
      });
    }
    return balance;
  }

  private async adjustBalance(
    skuId: string,
    locationId: string,
    lotId: string | null,
    delta: number,
  ): Promise<void> {
    const balance = await this.getBalanceRow(skuId, locationId, lotId);
    const newQuantity = Number(balance.quantity) + delta;
    if (newQuantity < 0) {
      throw new BadRequestException(
        'El movimiento dejaría el saldo de inventario en negativo.',
      );
    }
    balance.quantity = newQuantity.toFixed(3);
    await this.balanceRepository.save(balance);
  }
}
