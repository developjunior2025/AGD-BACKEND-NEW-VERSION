import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradeDocument } from './entities/trade-document.entity';
import { TradeCommercialClosure } from './entities/trade-commercial-closure.entity';
import { TradeDocumentStatus, TradeDocumentType } from './enums/trade.enums';
import { TradeDocumentBaseDto } from './dto/base.dto';
import { CloseCommercialDto } from './dto/closure.dto';

@Injectable()
export class TradeDocumentsService {
  constructor(
    @InjectRepository(TradeDocument)
    private readonly documentRepository: Repository<TradeDocument>,
    @InjectRepository(TradeCommercialClosure)
    private readonly closureRepository: Repository<TradeCommercialClosure>,
  ) {}

  /** Crea la cabecera común y la emite — usado por los servicios de cada tipo de documento. */
  async createHeader(
    documentType: TradeDocumentType,
    dto: TradeDocumentBaseDto,
  ): Promise<TradeDocument> {
    return this.documentRepository.save(
      this.documentRepository.create({
        documentType,
        code: dto.code,
        cargoFileId: dto.cargoFileId ?? null,
        orderId: dto.orderId ?? null,
        issuedAt: new Date(),
        status: TradeDocumentStatus.EMITIDO,
      }),
    );
  }

  async findOne(id: string): Promise<TradeDocument> {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Documento comercial ${id} no encontrado.`);
    }
    return document;
  }

  listForCargoFile(cargoFileId: string): Promise<TradeDocument[]> {
    return this.documentRepository.find({
      where: { cargoFileId },
      order: { createdAt: 'DESC' },
    });
  }

  async voidDocument(id: string): Promise<TradeDocument> {
    const document = await this.findOne(id);
    document.status = TradeDocumentStatus.ANULADO;
    return this.documentRepository.save(document);
  }

  async closeCommercial(
    orderId: string,
    closedBy: string,
    dto: CloseCommercialDto,
  ): Promise<TradeCommercialClosure> {
    const existing = await this.closureRepository.findOne({
      where: { orderId },
    });
    if (existing) {
      throw new BadRequestException(
        'La orden ya tiene un cierre comercial registrado.',
      );
    }
    return this.closureRepository.save(
      this.closureRepository.create({
        orderId,
        closedBy,
        closedAt: new Date(),
        summary: dto.summary ?? null,
      }),
    );
  }
}
