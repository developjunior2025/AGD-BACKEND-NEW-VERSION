import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Promotion } from './entities/promotion.entity';
import { PromotionService as PromotionServiceLink } from './entities/promotion-service.entity';
import { PromotionCondition } from './entities/promotion-condition.entity';
import { PromotionStatus } from './enums/promotion.enums';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import {
  AddPromotionConditionDto,
  AddPromotionServiceDto,
} from './dto/promotion-detail.dto';

@Injectable()
export class PromotionsService {
  constructor(
    @InjectRepository(Promotion)
    private readonly promotionRepository: Repository<Promotion>,
    @InjectRepository(PromotionServiceLink)
    private readonly promotionServiceRepository: Repository<PromotionServiceLink>,
    @InjectRepository(PromotionCondition)
    private readonly promotionConditionRepository: Repository<PromotionCondition>,
  ) {}

  create(dto: CreatePromotionDto): Promise<Promotion> {
    return this.promotionRepository.save(this.promotionRepository.create(dto));
  }

  /** Ofertas y promociones vigentes (§4.1, §4.2). */
  findActive(): Promise<Promotion[]> {
    const today = new Date().toISOString().slice(0, 10);
    return this.promotionRepository.find({
      where: {
        status: PromotionStatus.ACTIVA,
        validFrom: LessThanOrEqual(today),
        validUntil: MoreThanOrEqual(today),
      },
      relations: { services: true, conditions: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOne({
      where: { id },
      relations: { services: true, conditions: true },
    });
    if (!promotion) {
      throw new NotFoundException(`Promoción ${id} no encontrada.`);
    }
    return promotion;
  }

  async addService(
    promotionId: string,
    dto: AddPromotionServiceDto,
  ): Promise<PromotionServiceLink> {
    await this.findOne(promotionId);
    return this.promotionServiceRepository.save(
      this.promotionServiceRepository.create({ ...dto, promotionId }),
    );
  }

  async addCondition(
    promotionId: string,
    dto: AddPromotionConditionDto,
  ): Promise<PromotionCondition> {
    await this.findOne(promotionId);
    return this.promotionConditionRepository.save(
      this.promotionConditionRepository.create({ ...dto, promotionId }),
    );
  }

  async activate(id: string): Promise<Promotion> {
    const promotion = await this.findOne(id);
    if (
      promotion.status !== PromotionStatus.BORRADOR &&
      promotion.status !== PromotionStatus.PAUSADA
    ) {
      throw new BadRequestException(
        'Solo se puede activar una promoción en borrador o pausada.',
      );
    }
    promotion.status = PromotionStatus.ACTIVA;
    return this.promotionRepository.save(promotion);
  }

  async pause(id: string): Promise<Promotion> {
    const promotion = await this.findOne(id);
    if (promotion.status !== PromotionStatus.ACTIVA) {
      throw new BadRequestException(
        'Solo se puede pausar una promoción activa.',
      );
    }
    promotion.status = PromotionStatus.PAUSADA;
    return this.promotionRepository.save(promotion);
  }

  async finish(id: string): Promise<Promotion> {
    const promotion = await this.findOne(id);
    promotion.status = PromotionStatus.FINALIZADA;
    return this.promotionRepository.save(promotion);
  }

  async redeem(id: string): Promise<Promotion> {
    const promotion = await this.findOne(id);
    if (promotion.status !== PromotionStatus.ACTIVA) {
      throw new BadRequestException('La promoción no está activa.');
    }
    if (
      promotion.maxRedemptions &&
      promotion.redemptionsCount >= promotion.maxRedemptions
    ) {
      throw new BadRequestException('La promoción alcanzó su cupo máximo.');
    }
    promotion.redemptionsCount += 1;
    return this.promotionRepository.save(promotion);
  }
}
