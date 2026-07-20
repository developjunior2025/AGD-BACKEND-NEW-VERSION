import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentInstance } from './entities/document-instance.entity';
import { DocumentVersion } from './entities/document-version.entity';
import { DocumentStateHistory } from './entities/document-state-history.entity';
import { DocumentApproval } from './entities/document-approval.entity';
import { DocumentSignature } from './entities/document-signature.entity';
import { DocumentObservation } from './entities/document-observation.entity';
import { DocumentRemediation } from './entities/document-remediation.entity';
import { FurStatus } from '../fur/enums/fur-status.enum';
import {
  DocumentApprovalDecision,
  DocumentObservationStatus,
  RemediationStatus,
} from './enums/document-governance.enums';
import {
  AddDocumentObservationDto,
  AddDocumentRemediationDto,
  CreateDocumentInstanceDto,
  SignDocumentDto,
} from './dto/document-instance.dto';

const ALLOWED_TRANSITIONS: Record<FurStatus, FurStatus[]> = {
  [FurStatus.BORRADOR]: [FurStatus.EN_REVISION],
  [FurStatus.EN_REVISION]: [FurStatus.APROBADO, FurStatus.BORRADOR],
  [FurStatus.APROBADO]: [FurStatus.PUBLICADO],
  [FurStatus.PUBLICADO]: [FurStatus.OBSOLETO],
  [FurStatus.OBSOLETO]: [],
};

@Injectable()
export class DocumentInstancesService {
  constructor(
    @InjectRepository(DocumentInstance)
    private readonly instanceRepository: Repository<DocumentInstance>,
    @InjectRepository(DocumentVersion)
    private readonly versionRepository: Repository<DocumentVersion>,
    @InjectRepository(DocumentStateHistory)
    private readonly historyRepository: Repository<DocumentStateHistory>,
    @InjectRepository(DocumentApproval)
    private readonly approvalRepository: Repository<DocumentApproval>,
    @InjectRepository(DocumentSignature)
    private readonly signatureRepository: Repository<DocumentSignature>,
    @InjectRepository(DocumentObservation)
    private readonly observationRepository: Repository<DocumentObservation>,
    @InjectRepository(DocumentRemediation)
    private readonly remediationRepository: Repository<DocumentRemediation>,
  ) {}

  async create(
    dto: CreateDocumentInstanceDto,
    ownerId: string | null,
  ): Promise<DocumentInstance> {
    const instance = await this.instanceRepository.save(
      this.instanceRepository.create({ ...dto, ownerId }),
    );
    await this.versionRepository.save(
      this.versionRepository.create({
        documentInstanceId: instance.id,
        versionNumber: 1,
        snapshot: { ...dto },
        changeSummary: 'Creación inicial del documento.',
      }),
    );
    return instance;
  }

  async findOne(id: string): Promise<DocumentInstance> {
    const instance = await this.instanceRepository.findOne({
      where: { id },
      relations: {
        documentType: true,
        approvals: true,
        signatures: true,
        observations: true,
      },
    });
    if (!instance) {
      throw new NotFoundException(`Documento ${id} no encontrado.`);
    }
    return instance;
  }

  findBySource(
    sourceEntityType: string,
    sourceEntityId: string,
  ): Promise<DocumentInstance[]> {
    return this.instanceRepository.find({
      where: { sourceEntityType, sourceEntityId },
      order: { createdAt: 'DESC' },
    });
  }

  async submitForReview(
    id: string,
    actorId: string | null,
  ): Promise<DocumentInstance> {
    return this.transition(id, FurStatus.EN_REVISION, actorId);
  }

  async approve(
    id: string,
    approverId: string,
    comments?: string,
  ): Promise<DocumentInstance> {
    const instance = await this.transition(id, FurStatus.APROBADO, approverId);
    await this.approvalRepository.save(
      this.approvalRepository.create({
        documentInstanceId: id,
        approverId,
        decision: DocumentApprovalDecision.APROBADO,
        comments: comments ?? null,
        decidedAt: new Date(),
      }),
    );
    return instance;
  }

  async reject(
    id: string,
    approverId: string,
    comments?: string,
  ): Promise<DocumentInstance> {
    const instance = await this.transition(id, FurStatus.BORRADOR, approverId);
    await this.approvalRepository.save(
      this.approvalRepository.create({
        documentInstanceId: id,
        approverId,
        decision: DocumentApprovalDecision.RECHAZADO,
        comments: comments ?? null,
        decidedAt: new Date(),
      }),
    );
    return instance;
  }

  async publish(id: string, actorId: string | null): Promise<DocumentInstance> {
    const instance = await this.transition(id, FurStatus.PUBLICADO, actorId);
    instance.publishedAt = new Date();
    return this.instanceRepository.save(instance);
  }

  async markObsolete(
    id: string,
    actorId: string | null,
  ): Promise<DocumentInstance> {
    return this.transition(id, FurStatus.OBSOLETO, actorId);
  }

  async sign(
    id: string,
    signerId: string,
    dto: SignDocumentDto,
  ): Promise<DocumentSignature> {
    await this.findOne(id);
    return this.signatureRepository.save(
      this.signatureRepository.create({
        documentInstanceId: id,
        signerId,
        signedAt: new Date(),
        method: dto.method ?? null,
        signatureReference: dto.signatureReference ?? null,
      }),
    );
  }

  async addObservation(
    id: string,
    authorId: string,
    dto: AddDocumentObservationDto,
  ): Promise<DocumentObservation> {
    await this.findOne(id);
    return this.observationRepository.save(
      this.observationRepository.create({
        documentInstanceId: id,
        authorId,
        observation: dto.observation,
        status: DocumentObservationStatus.ABIERTA,
      }),
    );
  }

  async addRemediation(
    observationId: string,
    submittedBy: string,
    dto: AddDocumentRemediationDto,
  ): Promise<DocumentRemediation> {
    const observation = await this.observationRepository.findOne({
      where: { id: observationId },
    });
    if (!observation) {
      throw new NotFoundException(
        `Observación ${observationId} no encontrada.`,
      );
    }
    observation.status = DocumentObservationStatus.EN_SUBSANACION;
    await this.observationRepository.save(observation);

    return this.remediationRepository.save(
      this.remediationRepository.create({
        observationId,
        description: dto.description,
        evidenceUrl: dto.evidenceUrl ?? null,
        submittedBy,
        status: RemediationStatus.PENDIENTE,
      }),
    );
  }

  async decideRemediation(
    remediationId: string,
    accepted: boolean,
  ): Promise<DocumentRemediation> {
    const remediation = await this.remediationRepository.findOne({
      where: { id: remediationId },
    });
    if (!remediation) {
      throw new NotFoundException(
        `Subsanación ${remediationId} no encontrada.`,
      );
    }
    remediation.status = accepted
      ? RemediationStatus.ACEPTADA
      : RemediationStatus.RECHAZADA;
    const saved = await this.remediationRepository.save(remediation);

    if (accepted) {
      await this.observationRepository.update(
        { id: remediation.observationId },
        { status: DocumentObservationStatus.CERRADA, closedAt: new Date() },
      );
    }

    return saved;
  }

  private async transition(
    id: string,
    nextStatus: FurStatus,
    actorId: string | null,
  ): Promise<DocumentInstance> {
    const instance = await this.findOne(id);
    const allowed = ALLOWED_TRANSITIONS[instance.status];
    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `No se puede pasar el documento de "${instance.status}" a "${nextStatus}".`,
      );
    }

    const previousStatus = instance.status;
    instance.status = nextStatus;
    instance.version += 1;
    const saved = await this.instanceRepository.save(instance);

    await this.versionRepository.save(
      this.versionRepository.create({
        documentInstanceId: id,
        versionNumber: saved.version,
        snapshot: { status: nextStatus },
        changeSummary: `Cambio de estado: ${previousStatus} → ${nextStatus}.`,
      }),
    );

    await this.historyRepository.save(
      this.historyRepository.create({
        documentInstanceId: id,
        previousStatus,
        newStatus: nextStatus,
        changedBy: actorId,
      }),
    );

    return saved;
  }
}
