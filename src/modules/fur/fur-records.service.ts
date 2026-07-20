import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FurRecord } from './entities/fur-record.entity';
import { FurField } from './entities/fur-field.entity';
import { FurVersion } from './entities/fur-version.entity';
import { FurHistory } from './entities/fur-history.entity';
import {
  FurApproval,
  FurApprovalDecision,
} from './entities/fur-approval.entity';
import {
  FurObservation,
  FurObservationStatus,
} from './entities/fur-observation.entity';
import { FurStatus } from './enums/fur-status.enum';
import { CreateFurRecordDto } from './dto/create-fur-record.dto';

const ALLOWED_TRANSITIONS: Record<FurStatus, FurStatus[]> = {
  [FurStatus.BORRADOR]: [FurStatus.EN_REVISION],
  [FurStatus.EN_REVISION]: [FurStatus.APROBADO, FurStatus.BORRADOR],
  [FurStatus.APROBADO]: [FurStatus.PUBLICADO],
  [FurStatus.PUBLICADO]: [FurStatus.OBSOLETO],
  [FurStatus.OBSOLETO]: [],
};

@Injectable()
export class FurRecordsService {
  constructor(
    @InjectRepository(FurRecord)
    private readonly furRecordRepository: Repository<FurRecord>,
    @InjectRepository(FurField)
    private readonly furFieldRepository: Repository<FurField>,
    @InjectRepository(FurVersion)
    private readonly furVersionRepository: Repository<FurVersion>,
    @InjectRepository(FurHistory)
    private readonly furHistoryRepository: Repository<FurHistory>,
    @InjectRepository(FurApproval)
    private readonly furApprovalRepository: Repository<FurApproval>,
    @InjectRepository(FurObservation)
    private readonly furObservationRepository: Repository<FurObservation>,
  ) {}

  async create(
    dto: CreateFurRecordDto,
    actorId: string | null,
  ): Promise<FurRecord> {
    const { fields, ...rest } = dto;
    const furRecord = await this.furRecordRepository.save(
      this.furRecordRepository.create({ ...rest, ownerId: actorId }),
    );

    if (fields?.length) {
      await this.furFieldRepository.save(
        fields.map((field) =>
          this.furFieldRepository.create({
            ...field,
            furRecordId: furRecord.id,
          }),
        ),
      );
    }

    await this.furVersionRepository.save(
      this.furVersionRepository.create({
        furRecordId: furRecord.id,
        versionNumber: 1,
        snapshot: { ...rest, fields },
        changeSummary: 'Creación inicial del FUR.',
      }),
    );

    await this.recordHistory(
      furRecord.id,
      'creacion',
      null,
      { status: furRecord.status },
      actorId,
    );

    return furRecord;
  }

  findAll(furTypeId?: string): Promise<FurRecord[]> {
    return this.furRecordRepository.find({
      where: furTypeId ? { furTypeId } : {},
      order: { createdAt: 'DESC' },
      relations: { furType: true },
    });
  }

  async findOne(id: string): Promise<FurRecord> {
    const furRecord = await this.furRecordRepository.findOne({
      where: { id },
      relations: {
        furType: true,
        fields: true,
        approvals: true,
        observations: true,
        attachments: true,
      },
    });
    if (!furRecord) {
      throw new NotFoundException(`FUR ${id} no encontrado.`);
    }
    return furRecord;
  }

  async submitForReview(
    id: string,
    actorId: string | null,
  ): Promise<FurRecord> {
    return this.transition(id, FurStatus.EN_REVISION, actorId);
  }

  async approve(
    id: string,
    actorId: string,
    comments: string | undefined,
  ): Promise<FurRecord> {
    const furRecord = await this.transition(id, FurStatus.APROBADO, actorId);
    await this.furApprovalRepository.save(
      this.furApprovalRepository.create({
        furRecordId: id,
        approverId: actorId,
        decision: FurApprovalDecision.APROBADO,
        comments: comments ?? null,
        decidedAt: new Date(),
      }),
    );
    return furRecord;
  }

  async reject(
    id: string,
    actorId: string,
    comments: string | undefined,
  ): Promise<FurRecord> {
    const furRecord = await this.transition(id, FurStatus.BORRADOR, actorId);
    await this.furApprovalRepository.save(
      this.furApprovalRepository.create({
        furRecordId: id,
        approverId: actorId,
        decision: FurApprovalDecision.RECHAZADO,
        comments: comments ?? null,
        decidedAt: new Date(),
      }),
    );
    return furRecord;
  }

  async publish(id: string, actorId: string | null): Promise<FurRecord> {
    const furRecord = await this.transition(id, FurStatus.PUBLICADO, actorId);
    furRecord.publishedAt = new Date();
    return this.furRecordRepository.save(furRecord);
  }

  async markObsolete(id: string, actorId: string | null): Promise<FurRecord> {
    return this.transition(id, FurStatus.OBSOLETO, actorId);
  }

  async addObservation(
    id: string,
    authorId: string,
    observation: string,
  ): Promise<FurObservation> {
    await this.findOne(id);
    return this.furObservationRepository.save(
      this.furObservationRepository.create({
        furRecordId: id,
        authorId,
        observation,
        status: FurObservationStatus.ABIERTA,
      }),
    );
  }

  async closeObservation(
    observationId: string,
    closureEvidence: string | undefined,
  ): Promise<FurObservation> {
    const observation = await this.furObservationRepository.findOne({
      where: { id: observationId },
    });
    if (!observation) {
      throw new NotFoundException(
        `Observación ${observationId} no encontrada.`,
      );
    }
    observation.status = FurObservationStatus.CERRADA;
    observation.closedAt = new Date();
    observation.closureEvidence = closureEvidence ?? null;
    return this.furObservationRepository.save(observation);
  }

  private async transition(
    id: string,
    nextStatus: FurStatus,
    actorId: string | null,
  ): Promise<FurRecord> {
    const furRecord = await this.findOne(id);
    const allowed = ALLOWED_TRANSITIONS[furRecord.status];

    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `No se puede pasar el FUR de "${furRecord.status}" a "${nextStatus}".`,
      );
    }

    const previousStatus = furRecord.status;
    furRecord.status = nextStatus;
    const saved = await this.furRecordRepository.save(furRecord);

    await this.recordHistory(
      id,
      'cambio_estado',
      { status: previousStatus },
      { status: nextStatus },
      actorId,
    );

    return saved;
  }

  private recordHistory(
    furRecordId: string,
    changeType: string,
    previousState: Record<string, unknown> | null,
    newState: Record<string, unknown> | null,
    changedBy: string | null,
  ) {
    return this.furHistoryRepository.save(
      this.furHistoryRepository.create({
        furRecordId,
        changeType,
        previousState,
        newState,
        changedBy,
      }),
    );
  }
}
