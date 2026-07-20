import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomsValuation } from './entities/customs-valuation.entity';
import { CustomsTaxSettlement } from './entities/customs-tax-settlement.entity';
import { CustomsTaxItem } from './entities/customs-tax-item.entity';
import { CustomsSelectivityChannel } from './entities/customs-selectivity-channel.entity';
import { CustomsRiskProfile } from './entities/customs-risk-profile.entity';
import { CustomsInspection } from './entities/customs-inspection.entity';
import { CustomsInspectionResult } from './entities/customs-inspection-result.entity';
import { CustomsReleaseAuthorization } from './entities/customs-release-authorization.entity';
import { InspectionStatus, TaxSettlementStatus } from './enums/customs.enums';
import {
  AssignChannelDto,
  CreateRiskProfileDto,
  MarkTaxPaidDto,
  ScheduleInspectionDto,
  SetValuationDto,
  AddTaxItemDto,
} from './dto/processing.dto';
import {
  AddInspectionResultDto,
  AuthorizeReleaseDto,
} from './dto/inspection-result.dto';

@Injectable()
export class CustomsProcessingService {
  constructor(
    @InjectRepository(CustomsValuation)
    private readonly valuationRepository: Repository<CustomsValuation>,
    @InjectRepository(CustomsTaxSettlement)
    private readonly settlementRepository: Repository<CustomsTaxSettlement>,
    @InjectRepository(CustomsTaxItem)
    private readonly taxItemRepository: Repository<CustomsTaxItem>,
    @InjectRepository(CustomsSelectivityChannel)
    private readonly channelRepository: Repository<CustomsSelectivityChannel>,
    @InjectRepository(CustomsRiskProfile)
    private readonly riskProfileRepository: Repository<CustomsRiskProfile>,
    @InjectRepository(CustomsInspection)
    private readonly inspectionRepository: Repository<CustomsInspection>,
    @InjectRepository(CustomsInspectionResult)
    private readonly inspectionResultRepository: Repository<CustomsInspectionResult>,
    @InjectRepository(CustomsReleaseAuthorization)
    private readonly releaseRepository: Repository<CustomsReleaseAuthorization>,
  ) {}

  async setValuation(
    declarationId: string,
    dto: SetValuationDto,
  ): Promise<CustomsValuation> {
    let valuation = await this.valuationRepository.findOne({
      where: { declarationId },
    });
    if (!valuation) {
      valuation = this.valuationRepository.create({ declarationId });
    }
    Object.assign(valuation, dto);
    return this.valuationRepository.save(valuation);
  }

  getValuation(declarationId: string): Promise<CustomsValuation | null> {
    return this.valuationRepository.findOne({ where: { declarationId } });
  }

  private async getOrCreateSettlement(
    declarationId: string,
  ): Promise<CustomsTaxSettlement> {
    let settlement = await this.settlementRepository.findOne({
      where: { declarationId },
    });
    if (!settlement) {
      settlement = await this.settlementRepository.save(
        this.settlementRepository.create({ declarationId }),
      );
    }
    return settlement;
  }

  async addTaxItem(
    declarationId: string,
    dto: AddTaxItemDto,
  ): Promise<CustomsTaxItem> {
    const settlement = await this.getOrCreateSettlement(declarationId);
    const item = await this.taxItemRepository.save(
      this.taxItemRepository.create({ ...dto, settlementId: settlement.id }),
    );

    const items = await this.taxItemRepository.find({
      where: { settlementId: settlement.id },
    });
    settlement.totalAmount = items
      .reduce((sum, current) => sum + Number(current.amount), 0)
      .toFixed(2);
    await this.settlementRepository.save(settlement);

    return item;
  }

  async getSettlement(declarationId: string): Promise<CustomsTaxSettlement> {
    const settlement = await this.settlementRepository.findOne({
      where: { declarationId },
      relations: { items: true },
    });
    if (!settlement) {
      throw new NotFoundException(
        `No hay liquidación de tributos para ${declarationId}.`,
      );
    }
    return settlement;
  }

  async markTaxPaid(
    declarationId: string,
    dto: MarkTaxPaidDto,
  ): Promise<CustomsTaxSettlement> {
    const settlement = await this.getSettlement(declarationId);
    settlement.status = TaxSettlementStatus.PAGADO;
    settlement.paidAt = new Date();
    settlement.paymentReference = dto.paymentReference ?? null;
    return this.settlementRepository.save(settlement);
  }

  async assignChannel(
    declarationId: string,
    dto: AssignChannelDto,
  ): Promise<CustomsSelectivityChannel> {
    let channel = await this.channelRepository.findOne({
      where: { declarationId },
    });
    if (!channel) {
      channel = this.channelRepository.create({ declarationId });
    }
    channel.channel = dto.channel;
    channel.notes = dto.notes ?? null;
    channel.assignedAt = new Date();
    return this.channelRepository.save(channel);
  }

  createRiskProfile(dto: CreateRiskProfileDto): Promise<CustomsRiskProfile> {
    return this.riskProfileRepository.save(
      this.riskProfileRepository.create({ ...dto, evaluatedAt: new Date() }),
    );
  }

  findLatestRiskProfile(
    importerExporterId: string,
  ): Promise<CustomsRiskProfile | null> {
    return this.riskProfileRepository.findOne({
      where: { importerExporterId },
      order: { evaluatedAt: 'DESC' },
    });
  }

  async scheduleInspection(
    declarationId: string,
    dto: ScheduleInspectionDto,
  ): Promise<CustomsInspection> {
    return this.inspectionRepository.save(
      this.inspectionRepository.create({ ...dto, declarationId }),
    );
  }

  async addInspectionResult(
    inspectionId: string,
    dto: AddInspectionResultDto,
  ): Promise<CustomsInspectionResult> {
    const inspection = await this.inspectionRepository.findOne({
      where: { id: inspectionId },
    });
    if (!inspection) {
      throw new NotFoundException(`Inspección ${inspectionId} no encontrada.`);
    }
    inspection.status = InspectionStatus.REALIZADA;
    inspection.performedAt = new Date();
    await this.inspectionRepository.save(inspection);

    return this.inspectionResultRepository.save(
      this.inspectionResultRepository.create({ ...dto, inspectionId }),
    );
  }

  async authorizeRelease(
    declarationId: string,
    authorizedBy: string,
    dto: AuthorizeReleaseDto,
  ): Promise<CustomsReleaseAuthorization> {
    const existing = await this.releaseRepository.findOne({
      where: { declarationId },
    });
    if (existing) {
      throw new ConflictException(
        'El levante de esta declaración ya fue autorizado.',
      );
    }
    return this.releaseRepository.save(
      this.releaseRepository.create({
        ...dto,
        declarationId,
        authorizedBy,
        authorizedAt: new Date(),
      }),
    );
  }

  getRelease(
    declarationId: string,
  ): Promise<CustomsReleaseAuthorization | null> {
    return this.releaseRepository.findOne({ where: { declarationId } });
  }
}
