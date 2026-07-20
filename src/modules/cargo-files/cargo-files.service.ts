import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CargoFile } from './entities/cargo-file.entity';
import { CargoFileParty } from './entities/cargo-file-party.entity';
import { CargoFileDocument } from './entities/cargo-file-document.entity';
import { CargoFileChecklist } from './entities/cargo-file-checklist.entity';
import { CargoFileChecklistItem } from './entities/cargo-file-checklist-item.entity';
import { CargoFileMilestone } from './entities/cargo-file-milestone.entity';
import { CargoFileStatusHistory } from './entities/cargo-file-status-history.entity';
import { CargoFileAlert } from './entities/cargo-file-alert.entity';
import {
  CargoFileStatus,
  CargoMilestoneStatus,
} from './enums/cargo-file.enums';
import { CreateCargoFileDto } from './dto/create-cargo-file.dto';
import {
  AddAlertDto,
  AddCargoFileDocumentDto,
  AddCargoFilePartyDto,
  AddChecklistItemDto,
  AddMilestoneDto,
  CreateChecklistDto,
} from './dto/cargo-file-detail.dto';

const ALLOWED_TRANSITIONS: Record<CargoFileStatus, CargoFileStatus[]> = {
  [CargoFileStatus.RECIBIDO]: [
    CargoFileStatus.EN_REVISION,
    CargoFileStatus.VENCIDO,
  ],
  [CargoFileStatus.EN_REVISION]: [
    CargoFileStatus.VALIDADO,
    CargoFileStatus.OBSERVADO,
    CargoFileStatus.VENCIDO,
  ],
  [CargoFileStatus.OBSERVADO]: [
    CargoFileStatus.EN_SUBSANACION,
    CargoFileStatus.VENCIDO,
  ],
  [CargoFileStatus.EN_SUBSANACION]: [
    CargoFileStatus.EN_REVISION,
    CargoFileStatus.VENCIDO,
  ],
  [CargoFileStatus.VALIDADO]: [
    CargoFileStatus.APROBADO,
    CargoFileStatus.VENCIDO,
  ],
  [CargoFileStatus.APROBADO]: [
    CargoFileStatus.EN_TRANSITO,
    CargoFileStatus.VENCIDO,
  ],
  [CargoFileStatus.EN_TRANSITO]: [
    CargoFileStatus.ENTREGADO,
    CargoFileStatus.VENCIDO,
  ],
  [CargoFileStatus.ENTREGADO]: [CargoFileStatus.CERRADO],
  [CargoFileStatus.CERRADO]: [],
  [CargoFileStatus.VENCIDO]: [],
};

const DETAIL_RELATIONS = {
  parties: true,
  documents: true,
  checklists: { items: true },
  milestones: true,
  alerts: true,
} as const;

@Injectable()
export class CargoFilesService {
  constructor(
    @InjectRepository(CargoFile)
    private readonly cargoFileRepository: Repository<CargoFile>,
    @InjectRepository(CargoFileParty)
    private readonly partyRepository: Repository<CargoFileParty>,
    @InjectRepository(CargoFileDocument)
    private readonly documentRepository: Repository<CargoFileDocument>,
    @InjectRepository(CargoFileChecklist)
    private readonly checklistRepository: Repository<CargoFileChecklist>,
    @InjectRepository(CargoFileChecklistItem)
    private readonly checklistItemRepository: Repository<CargoFileChecklistItem>,
    @InjectRepository(CargoFileMilestone)
    private readonly milestoneRepository: Repository<CargoFileMilestone>,
    @InjectRepository(CargoFileStatusHistory)
    private readonly statusHistoryRepository: Repository<CargoFileStatusHistory>,
    @InjectRepository(CargoFileAlert)
    private readonly alertRepository: Repository<CargoFileAlert>,
  ) {}

  async create(clientId: string, dto: CreateCargoFileDto): Promise<CargoFile> {
    const cargoFile = await this.cargoFileRepository.save(
      this.cargoFileRepository.create({ ...dto, clientId }),
    );
    await this.statusHistoryRepository.save(
      this.statusHistoryRepository.create({
        cargoFileId: cargoFile.id,
        previousStatus: null,
        newStatus: cargoFile.status,
        reason: 'Creación del expediente.',
      }),
    );
    return cargoFile;
  }

  listForClient(clientId: string): Promise<CargoFile[]> {
    return this.cargoFileRepository.find({
      where: { clientId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<CargoFile> {
    const cargoFile = await this.cargoFileRepository.findOne({
      where: { id },
      relations: DETAIL_RELATIONS,
    });
    if (!cargoFile) {
      throw new NotFoundException(`Expediente ${id} no encontrado.`);
    }
    return cargoFile;
  }

  async transition(
    id: string,
    nextStatus: CargoFileStatus,
    actorId: string | null,
    reason?: string,
  ): Promise<CargoFile> {
    const cargoFile = await this.findOne(id);
    const allowed = ALLOWED_TRANSITIONS[cargoFile.status];
    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `No se puede pasar el expediente de "${cargoFile.status}" a "${nextStatus}".`,
      );
    }

    const previousStatus = cargoFile.status;
    cargoFile.status = nextStatus;
    if (nextStatus === CargoFileStatus.CERRADO) {
      cargoFile.closedAt = new Date();
    }
    const saved = await this.cargoFileRepository.save(cargoFile);

    await this.statusHistoryRepository.save(
      this.statusHistoryRepository.create({
        cargoFileId: id,
        previousStatus,
        newStatus: nextStatus,
        changedBy: actorId,
        reason: reason ?? null,
      }),
    );

    return saved;
  }

  async addParty(
    cargoFileId: string,
    dto: AddCargoFilePartyDto,
  ): Promise<CargoFileParty> {
    await this.findOne(cargoFileId);
    return this.partyRepository.save(
      this.partyRepository.create({ ...dto, cargoFileId }),
    );
  }

  async addDocument(
    cargoFileId: string,
    dto: AddCargoFileDocumentDto,
  ): Promise<CargoFileDocument> {
    await this.findOne(cargoFileId);
    return this.documentRepository.save(
      this.documentRepository.create({ ...dto, cargoFileId }),
    );
  }

  async createChecklist(
    cargoFileId: string,
    dto: CreateChecklistDto,
  ): Promise<CargoFileChecklist> {
    await this.findOne(cargoFileId);
    return this.checklistRepository.save(
      this.checklistRepository.create({ ...dto, cargoFileId }),
    );
  }

  async addChecklistItem(
    checklistId: string,
    dto: AddChecklistItemDto,
  ): Promise<CargoFileChecklistItem> {
    const checklist = await this.checklistRepository.findOne({
      where: { id: checklistId },
    });
    if (!checklist) {
      throw new NotFoundException(`Checklist ${checklistId} no encontrado.`);
    }
    return this.checklistItemRepository.save(
      this.checklistItemRepository.create({ ...dto, checklistId }),
    );
  }

  async completeChecklistItem(itemId: string): Promise<CargoFileChecklistItem> {
    const item = await this.checklistItemRepository.findOne({
      where: { id: itemId },
    });
    if (!item) {
      throw new NotFoundException(`Ítem de checklist ${itemId} no encontrado.`);
    }
    item.isCompleted = true;
    item.completedAt = new Date();
    return this.checklistItemRepository.save(item);
  }

  async addMilestone(
    cargoFileId: string,
    dto: AddMilestoneDto,
  ): Promise<CargoFileMilestone> {
    await this.findOne(cargoFileId);
    return this.milestoneRepository.save(
      this.milestoneRepository.create({ ...dto, cargoFileId }),
    );
  }

  async completeMilestone(milestoneId: string): Promise<CargoFileMilestone> {
    const milestone = await this.milestoneRepository.findOne({
      where: { id: milestoneId },
    });
    if (!milestone) {
      throw new NotFoundException(`Hito ${milestoneId} no encontrado.`);
    }
    milestone.status = CargoMilestoneStatus.CUMPLIDO;
    milestone.occurredAt = new Date();
    return this.milestoneRepository.save(milestone);
  }

  async addAlert(
    cargoFileId: string,
    dto: AddAlertDto,
  ): Promise<CargoFileAlert> {
    await this.findOne(cargoFileId);
    return this.alertRepository.save(
      this.alertRepository.create({ ...dto, cargoFileId }),
    );
  }

  async resolveAlert(alertId: string): Promise<CargoFileAlert> {
    const alert = await this.alertRepository.findOne({
      where: { id: alertId },
    });
    if (!alert) {
      throw new NotFoundException(`Alerta ${alertId} no encontrada.`);
    }
    alert.isResolved = true;
    alert.resolvedAt = new Date();
    return this.alertRepository.save(alert);
  }
}
