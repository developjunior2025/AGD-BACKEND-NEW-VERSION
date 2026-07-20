import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortManifest } from './entities/port-manifest.entity';
import { PortManifestItem } from './entities/port-manifest-item.entity';
import { PortManifestReconciliation } from './entities/port-manifest-reconciliation.entity';
import { PortDiscrepancy } from './entities/port-discrepancy.entity';
import {
  ManifestStatus,
  DiscrepancyStatus,
  ReconciliationStatus,
} from './enums/port.enums';
import {
  AddDiscrepancyDto,
  CreateManifestDto,
  ManifestItemDto,
  ReconcileManifestDto,
} from './dto/manifest.dto';

@Injectable()
export class PortManifestsService {
  constructor(
    @InjectRepository(PortManifest)
    private readonly manifestRepository: Repository<PortManifest>,
    @InjectRepository(PortManifestItem)
    private readonly itemRepository: Repository<PortManifestItem>,
    @InjectRepository(PortManifestReconciliation)
    private readonly reconciliationRepository: Repository<PortManifestReconciliation>,
    @InjectRepository(PortDiscrepancy)
    private readonly discrepancyRepository: Repository<PortDiscrepancy>,
  ) {}

  async create(
    voyageId: string,
    dto: CreateManifestDto,
  ): Promise<PortManifest> {
    const { items, ...rest } = dto;
    const manifest = await this.manifestRepository.save(
      this.manifestRepository.create({ ...rest, voyageId }),
    );

    if (items?.length) {
      await this.itemRepository.save(
        items.map((item) =>
          this.itemRepository.create({ ...item, manifestId: manifest.id }),
        ),
      );
    }

    return manifest;
  }

  async findOne(id: string): Promise<PortManifest> {
    const manifest = await this.manifestRepository.findOne({
      where: { id },
      relations: { items: true },
    });
    if (!manifest) {
      throw new NotFoundException(`Manifiesto ${id} no encontrado.`);
    }
    return manifest;
  }

  async addItem(
    manifestId: string,
    dto: ManifestItemDto,
  ): Promise<PortManifestItem> {
    await this.findOne(manifestId);
    return this.itemRepository.save(
      this.itemRepository.create({ ...dto, manifestId }),
    );
  }

  async reconcile(
    manifestId: string,
    reconciledBy: string,
    dto: ReconcileManifestDto,
  ): Promise<PortManifestReconciliation> {
    const manifest = await this.findOne(manifestId);
    manifest.status =
      dto.status === ReconciliationStatus.CONFORME
        ? ManifestStatus.CONCILIADO
        : ManifestStatus.EN_CONCILIACION;
    await this.manifestRepository.save(manifest);

    return this.reconciliationRepository.save(
      this.reconciliationRepository.create({
        manifestId,
        reconciledBy,
        reconciledAt: new Date(),
        status: dto.status,
        notes: dto.notes ?? null,
      }),
    );
  }

  async addDiscrepancy(
    reconciliationId: string,
    dto: AddDiscrepancyDto,
  ): Promise<PortDiscrepancy> {
    const reconciliation = await this.reconciliationRepository.findOne({
      where: { id: reconciliationId },
    });
    if (!reconciliation) {
      throw new NotFoundException(
        `Conciliación ${reconciliationId} no encontrada.`,
      );
    }
    return this.discrepancyRepository.save(
      this.discrepancyRepository.create({ ...dto, reconciliationId }),
    );
  }

  async resolveDiscrepancy(id: string): Promise<PortDiscrepancy> {
    const discrepancy = await this.discrepancyRepository.findOne({
      where: { id },
    });
    if (!discrepancy) {
      throw new NotFoundException(`Discrepancia ${id} no encontrada.`);
    }
    discrepancy.resolvedStatus = DiscrepancyStatus.RESUELTA;
    return this.discrepancyRepository.save(discrepancy);
  }
}
