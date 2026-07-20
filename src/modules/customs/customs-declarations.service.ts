import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomsDeclaration } from './entities/customs-declaration.entity';
import { CustomsDeclarationItem } from './entities/customs-declaration-item.entity';
import { CustomsStatusHistory } from './entities/customs-status-history.entity';
import { CustomsRequirement } from './entities/customs-requirement.entity';
import { CustomsObservation } from './entities/customs-observation.entity';
import {
  CustomsDeclarationStatus,
  CustomsObservationStatus,
  RequirementStatus,
} from './enums/customs.enums';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import {
  AddCustomsObservationDto,
  AddRequirementDto,
} from './dto/declaration-detail.dto';

const ALLOWED_TRANSITIONS: Record<
  CustomsDeclarationStatus,
  CustomsDeclarationStatus[]
> = {
  [CustomsDeclarationStatus.BORRADOR]: [CustomsDeclarationStatus.PRESENTADA],
  [CustomsDeclarationStatus.PRESENTADA]: [CustomsDeclarationStatus.EN_REVISION],
  [CustomsDeclarationStatus.EN_REVISION]: [
    CustomsDeclarationStatus.OBSERVADA,
    CustomsDeclarationStatus.LEVANTE_AUTORIZADO,
  ],
  [CustomsDeclarationStatus.OBSERVADA]: [CustomsDeclarationStatus.EN_REVISION],
  [CustomsDeclarationStatus.LEVANTE_AUTORIZADO]: [
    CustomsDeclarationStatus.CERRADA,
  ],
  [CustomsDeclarationStatus.CERRADA]: [],
};

const DETAIL_RELATIONS = { items: true } as const;

@Injectable()
export class CustomsDeclarationsService {
  constructor(
    @InjectRepository(CustomsDeclaration)
    private readonly declarationRepository: Repository<CustomsDeclaration>,
    @InjectRepository(CustomsDeclarationItem)
    private readonly itemRepository: Repository<CustomsDeclarationItem>,
    @InjectRepository(CustomsStatusHistory)
    private readonly statusHistoryRepository: Repository<CustomsStatusHistory>,
    @InjectRepository(CustomsRequirement)
    private readonly requirementRepository: Repository<CustomsRequirement>,
    @InjectRepository(CustomsObservation)
    private readonly observationRepository: Repository<CustomsObservation>,
  ) {}

  async create(dto: CreateDeclarationDto): Promise<CustomsDeclaration> {
    const { items, ...rest } = dto;
    const declaration = await this.declarationRepository.save(
      this.declarationRepository.create(rest),
    );

    if (items?.length) {
      await this.itemRepository.save(
        items.map((item) =>
          this.itemRepository.create({
            ...item,
            declarationId: declaration.id,
          }),
        ),
      );
    }

    await this.statusHistoryRepository.save(
      this.statusHistoryRepository.create({
        declarationId: declaration.id,
        previousStatus: null,
        newStatus: declaration.status,
        reason: 'Creación de la declaración.',
      }),
    );

    return declaration;
  }

  listForBroker(brokerId: string): Promise<CustomsDeclaration[]> {
    return this.declarationRepository.find({
      where: { brokerId },
      order: { createdAt: 'DESC' },
    });
  }

  listForImporter(importerExporterId: string): Promise<CustomsDeclaration[]> {
    return this.declarationRepository.find({
      where: { importerExporterId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<CustomsDeclaration> {
    const declaration = await this.declarationRepository.findOne({
      where: { id },
      relations: DETAIL_RELATIONS,
    });
    if (!declaration) {
      throw new NotFoundException(`Declaración ${id} no encontrada.`);
    }
    return declaration;
  }

  async transition(
    id: string,
    nextStatus: CustomsDeclarationStatus,
    actorId: string | null,
    reason?: string,
  ): Promise<CustomsDeclaration> {
    const declaration = await this.findOne(id);
    const allowed = ALLOWED_TRANSITIONS[declaration.status];
    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `No se puede pasar la declaración de "${declaration.status}" a "${nextStatus}".`,
      );
    }

    const previousStatus = declaration.status;
    declaration.status = nextStatus;
    if (nextStatus === CustomsDeclarationStatus.PRESENTADA) {
      declaration.submittedAt = new Date();
    }
    const saved = await this.declarationRepository.save(declaration);

    await this.statusHistoryRepository.save(
      this.statusHistoryRepository.create({
        declarationId: id,
        previousStatus,
        newStatus: nextStatus,
        changedBy: actorId,
        reason: reason ?? null,
      }),
    );

    return saved;
  }

  async addRequirement(
    declarationId: string,
    dto: AddRequirementDto,
  ): Promise<CustomsRequirement> {
    await this.findOne(declarationId);
    return this.requirementRepository.save(
      this.requirementRepository.create({ ...dto, declarationId }),
    );
  }

  async completeRequirement(
    requirementId: string,
  ): Promise<CustomsRequirement> {
    const requirement = await this.requirementRepository.findOne({
      where: { id: requirementId },
    });
    if (!requirement) {
      throw new NotFoundException(
        `Requerimiento ${requirementId} no encontrado.`,
      );
    }
    requirement.status = RequirementStatus.CUMPLIDO;
    return this.requirementRepository.save(requirement);
  }

  async addObservation(
    declarationId: string,
    authorId: string,
    dto: AddCustomsObservationDto,
  ): Promise<CustomsObservation> {
    await this.findOne(declarationId);
    return this.observationRepository.save(
      this.observationRepository.create({
        declarationId,
        authorId,
        observation: dto.observation,
      }),
    );
  }

  async closeObservation(observationId: string): Promise<CustomsObservation> {
    const observation = await this.observationRepository.findOne({
      where: { id: observationId },
    });
    if (!observation) {
      throw new NotFoundException(
        `Observación ${observationId} no encontrada.`,
      );
    }
    observation.status = CustomsObservationStatus.CERRADA;
    observation.closedAt = new Date();
    return this.observationRepository.save(observation);
  }
}
