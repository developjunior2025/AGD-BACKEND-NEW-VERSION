import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradePackingList } from './entities/trade-packing-list.entity';
import { TradePackingListItem } from './entities/trade-packing-list-item.entity';
import { TradeBillOfLading } from './entities/trade-bill-of-lading.entity';
import { TradeAirWaybill } from './entities/trade-air-waybill.entity';
import { TradeCertificateOfOrigin } from './entities/trade-certificate-of-origin.entity';
import { TradeShippingInstruction } from './entities/trade-shipping-instruction.entity';
import { TradeDocumentType } from './enums/trade.enums';
import { TradeDocumentsService } from './trade-documents.service';
import {
  AddPackingListItemDto,
  CreateAirWaybillDto,
  CreateBillOfLadingDto,
  CreateCertificateOfOriginDto,
  CreatePackingListDto,
  CreateShippingInstructionDto,
} from './dto/shipping-docs.dto';

@Injectable()
export class TradeShippingDocsService {
  constructor(
    @InjectRepository(TradePackingList)
    private readonly packingListRepository: Repository<TradePackingList>,
    @InjectRepository(TradePackingListItem)
    private readonly packingListItemRepository: Repository<TradePackingListItem>,
    @InjectRepository(TradeBillOfLading)
    private readonly billOfLadingRepository: Repository<TradeBillOfLading>,
    @InjectRepository(TradeAirWaybill)
    private readonly airWaybillRepository: Repository<TradeAirWaybill>,
    @InjectRepository(TradeCertificateOfOrigin)
    private readonly certificateRepository: Repository<TradeCertificateOfOrigin>,
    @InjectRepository(TradeShippingInstruction)
    private readonly shippingInstructionRepository: Repository<TradeShippingInstruction>,
    private readonly tradeDocumentsService: TradeDocumentsService,
  ) {}

  async createPackingList(
    dto: CreatePackingListDto,
  ): Promise<TradePackingList> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.PACKING_LIST,
      dto,
    );
    return this.packingListRepository.save(
      this.packingListRepository.create({ ...dto, documentId: document.id }),
    );
  }

  async findPackingList(id: string): Promise<TradePackingList> {
    const packingList = await this.packingListRepository.findOne({
      where: { id },
      relations: { items: true },
    });
    if (!packingList) {
      throw new NotFoundException(`Packing list ${id} no encontrada.`);
    }
    return packingList;
  }

  async addPackingListItem(
    packingListId: string,
    dto: AddPackingListItemDto,
  ): Promise<TradePackingListItem> {
    await this.findPackingList(packingListId);
    return this.packingListItemRepository.save(
      this.packingListItemRepository.create({ ...dto, packingListId }),
    );
  }

  async createBillOfLading(
    dto: CreateBillOfLadingDto,
  ): Promise<TradeBillOfLading> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.BILL_OF_LADING,
      dto,
    );
    return this.billOfLadingRepository.save(
      this.billOfLadingRepository.create({ ...dto, documentId: document.id }),
    );
  }

  async createAirWaybill(dto: CreateAirWaybillDto): Promise<TradeAirWaybill> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.AIR_WAYBILL,
      dto,
    );
    return this.airWaybillRepository.save(
      this.airWaybillRepository.create({ ...dto, documentId: document.id }),
    );
  }

  async createCertificateOfOrigin(
    dto: CreateCertificateOfOriginDto,
  ): Promise<TradeCertificateOfOrigin> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.CERTIFICADO_ORIGEN,
      dto,
    );
    return this.certificateRepository.save(
      this.certificateRepository.create({ ...dto, documentId: document.id }),
    );
  }

  async createShippingInstruction(
    dto: CreateShippingInstructionDto,
  ): Promise<TradeShippingInstruction> {
    const document = await this.tradeDocumentsService.createHeader(
      TradeDocumentType.INSTRUCCIONES_DESPACHO,
      dto,
    );
    return this.shippingInstructionRepository.save(
      this.shippingInstructionRepository.create({
        ...dto,
        documentId: document.id,
      }),
    );
  }
}
