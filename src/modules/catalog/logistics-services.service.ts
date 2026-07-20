import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, In, Repository } from 'typeorm';
import { LogisticsService } from './entities/logistics-service.entity';
import { ServiceScope } from './entities/service-scope.entity';
import { ServiceRequirement } from './entities/service-requirement.entity';
import { ServiceDeliverable } from './entities/service-deliverable.entity';
import { ServicePricing } from './entities/service-pricing.entity';
import { ServicePackage } from './entities/service-package.entity';
import { ServiceAvailability } from './entities/service-availability.entity';
import { ServiceRelatedItem } from './entities/service-related-item.entity';
import { ServiceStatus } from './enums/service.enums';
import { CreateLogisticsServiceDto } from './dto/create-logistics-service.dto';
import {
  AddServiceDeliverableDto,
  AddServicePackageDto,
  AddServicePricingDto,
  AddServiceRequirementDto,
  SetServiceAvailabilityDto,
  SetServiceScopeDto,
} from './dto/service-detail.dto';

const ALLOWED_TRANSITIONS: Record<ServiceStatus, ServiceStatus[]> = {
  [ServiceStatus.BORRADOR]: [ServiceStatus.PUBLICADO],
  [ServiceStatus.PUBLICADO]: [ServiceStatus.PAUSADO, ServiceStatus.ARCHIVADO],
  [ServiceStatus.PAUSADO]: [ServiceStatus.PUBLICADO, ServiceStatus.ARCHIVADO],
  [ServiceStatus.ARCHIVADO]: [],
};

export interface SearchServicesFilters {
  categoryId?: string;
  subcategoryId?: string;
  providerProfileId?: string;
  search?: string;
  ids?: string[];
}

const DETAIL_RELATIONS = {
  category: true,
  subcategory: true,
  providerProfile: true,
  scope: true,
  requirements: true,
  deliverables: true,
  pricing: true,
  packages: true,
  availability: true,
} as const;

@Injectable()
export class LogisticsServicesService {
  constructor(
    @InjectRepository(LogisticsService)
    private readonly serviceRepository: Repository<LogisticsService>,
    @InjectRepository(ServiceScope)
    private readonly scopeRepository: Repository<ServiceScope>,
    @InjectRepository(ServiceRequirement)
    private readonly requirementRepository: Repository<ServiceRequirement>,
    @InjectRepository(ServiceDeliverable)
    private readonly deliverableRepository: Repository<ServiceDeliverable>,
    @InjectRepository(ServicePricing)
    private readonly pricingRepository: Repository<ServicePricing>,
    @InjectRepository(ServicePackage)
    private readonly packageRepository: Repository<ServicePackage>,
    @InjectRepository(ServiceAvailability)
    private readonly availabilityRepository: Repository<ServiceAvailability>,
    @InjectRepository(ServiceRelatedItem)
    private readonly relatedItemRepository: Repository<ServiceRelatedItem>,
  ) {}

  create(dto: CreateLogisticsServiceDto): Promise<LogisticsService> {
    return this.serviceRepository.save(this.serviceRepository.create(dto));
  }

  /** Buscador (§4.1) y comparador (§4.1): filtros combinables + selección por ids. */
  async search(filters: SearchServicesFilters): Promise<LogisticsService[]> {
    if (filters.ids?.length) {
      return this.serviceRepository.find({
        where: { id: In(filters.ids) },
        relations: DETAIL_RELATIONS,
      });
    }

    const where: FindOptionsWhere<LogisticsService> = {
      status: ServiceStatus.PUBLICADO,
    };
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.subcategoryId) where.subcategoryId = filters.subcategoryId;
    if (filters.providerProfileId)
      where.providerProfileId = filters.providerProfileId;
    if (filters.search) where.name = ILike(`%${filters.search}%`);

    return this.serviceRepository.find({
      where,
      relations: { category: true, subcategory: true, pricing: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<LogisticsService> {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: DETAIL_RELATIONS,
    });
    if (!service) {
      throw new NotFoundException(`Servicio ${id} no encontrado.`);
    }
    return service;
  }

  async publish(id: string): Promise<LogisticsService> {
    return this.transition(id, ServiceStatus.PUBLICADO);
  }

  async pause(id: string): Promise<LogisticsService> {
    return this.transition(id, ServiceStatus.PAUSADO);
  }

  async archive(id: string): Promise<LogisticsService> {
    return this.transition(id, ServiceStatus.ARCHIVADO);
  }

  async setScope(
    logisticsServiceId: string,
    dto: SetServiceScopeDto,
  ): Promise<ServiceScope> {
    await this.findOne(logisticsServiceId);
    let scope = await this.scopeRepository.findOne({
      where: { logisticsServiceId },
    });
    if (!scope) {
      scope = this.scopeRepository.create({ logisticsServiceId });
    }
    Object.assign(scope, dto);
    return this.scopeRepository.save(scope);
  }

  async addRequirement(
    logisticsServiceId: string,
    dto: AddServiceRequirementDto,
  ): Promise<ServiceRequirement> {
    await this.findOne(logisticsServiceId);
    return this.requirementRepository.save(
      this.requirementRepository.create({ ...dto, logisticsServiceId }),
    );
  }

  async addDeliverable(
    logisticsServiceId: string,
    dto: AddServiceDeliverableDto,
  ): Promise<ServiceDeliverable> {
    await this.findOne(logisticsServiceId);
    return this.deliverableRepository.save(
      this.deliverableRepository.create({ ...dto, logisticsServiceId }),
    );
  }

  async addPricing(
    logisticsServiceId: string,
    dto: AddServicePricingDto,
  ): Promise<ServicePricing> {
    await this.findOne(logisticsServiceId);
    return this.pricingRepository.save(
      this.pricingRepository.create({ ...dto, logisticsServiceId }),
    );
  }

  async addPackage(
    logisticsServiceId: string,
    dto: AddServicePackageDto,
  ): Promise<ServicePackage> {
    await this.findOne(logisticsServiceId);
    return this.packageRepository.save(
      this.packageRepository.create({ ...dto, logisticsServiceId }),
    );
  }

  async setAvailability(
    logisticsServiceId: string,
    dto: SetServiceAvailabilityDto,
  ): Promise<ServiceAvailability> {
    await this.findOne(logisticsServiceId);
    let availability = await this.availabilityRepository.findOne({
      where: { logisticsServiceId },
    });
    if (!availability) {
      availability = this.availabilityRepository.create({ logisticsServiceId });
    }
    Object.assign(availability, dto);
    return this.availabilityRepository.save(availability);
  }

  async addRelatedService(
    logisticsServiceId: string,
    relatedServiceId: string,
  ): Promise<ServiceRelatedItem> {
    if (logisticsServiceId === relatedServiceId) {
      throw new BadRequestException(
        'Un servicio no puede relacionarse consigo mismo.',
      );
    }
    await this.findOne(logisticsServiceId);
    await this.findOne(relatedServiceId);
    return this.relatedItemRepository.save(
      this.relatedItemRepository.create({
        logisticsServiceId,
        relatedServiceId,
      }),
    );
  }

  private async transition(
    id: string,
    nextStatus: ServiceStatus,
  ): Promise<LogisticsService> {
    const service = await this.findOne(id);
    const allowed = ALLOWED_TRANSITIONS[service.status];
    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `No se puede pasar el servicio de "${service.status}" a "${nextStatus}".`,
      );
    }
    service.status = nextStatus;
    return this.serviceRepository.save(service);
  }
}
