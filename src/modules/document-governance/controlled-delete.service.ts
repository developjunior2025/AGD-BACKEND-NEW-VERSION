import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ControlledDeleteRequest } from './entities/controlled-delete-request.entity';
import { ControlledDeleteStatus } from './enums/document-governance.enums';
import {
  CreateControlledDeleteRequestDto,
  ReviewControlledDeleteRequestDto,
} from './dto/controlled-delete.dto';

/** Borrado excepcional con autorización, justificación y auditoría (regla §10). */
@Injectable()
export class ControlledDeleteService {
  constructor(
    @InjectRepository(ControlledDeleteRequest)
    private readonly requestRepository: Repository<ControlledDeleteRequest>,
  ) {}

  create(
    requestedBy: string,
    dto: CreateControlledDeleteRequestDto,
  ): Promise<ControlledDeleteRequest> {
    return this.requestRepository.save(
      this.requestRepository.create({ ...dto, requestedBy }),
    );
  }

  async findOne(id: string): Promise<ControlledDeleteRequest> {
    const request = await this.requestRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`Solicitud de borrado ${id} no encontrada.`);
    }
    return request;
  }

  listPending(): Promise<ControlledDeleteRequest[]> {
    return this.requestRepository.find({
      where: { status: ControlledDeleteStatus.PENDIENTE },
      order: { createdAt: 'ASC' },
    });
  }

  async approve(
    id: string,
    reviewerId: string,
    dto: ReviewControlledDeleteRequestDto,
  ): Promise<ControlledDeleteRequest> {
    return this.decide(
      id,
      reviewerId,
      ControlledDeleteStatus.APROBADA,
      dto.reason,
    );
  }

  async reject(
    id: string,
    reviewerId: string,
    dto: ReviewControlledDeleteRequestDto,
  ): Promise<ControlledDeleteRequest> {
    return this.decide(
      id,
      reviewerId,
      ControlledDeleteStatus.RECHAZADA,
      dto.reason,
    );
  }

  private async decide(
    id: string,
    reviewerId: string,
    status: ControlledDeleteStatus,
    reason?: string,
  ): Promise<ControlledDeleteRequest> {
    const request = await this.findOne(id);
    if (request.status !== ControlledDeleteStatus.PENDIENTE) {
      throw new BadRequestException('La solicitud ya fue revisada.');
    }
    request.status = status;
    request.reviewedBy = reviewerId;
    request.reviewedAt = new Date();
    request.reason = reason ?? null;
    return this.requestRepository.save(request);
  }
}
