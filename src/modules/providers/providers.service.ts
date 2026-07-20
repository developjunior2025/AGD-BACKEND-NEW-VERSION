import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderProfile } from './entities/provider-profile.entity';
import { ProviderCategory } from './entities/provider-category.entity';
import { ProviderSpecialty } from './entities/provider-specialty.entity';
import { ProviderServiceArea } from './entities/provider-service-area.entity';
import { ProviderCertification } from './entities/provider-certification.entity';
import { ProviderLicense } from './entities/provider-license.entity';
import { ProviderInsurance } from './entities/provider-insurance.entity';
import { ProviderVerification } from './entities/provider-verification.entity';
import { ProviderPortfolio } from './entities/provider-portfolio.entity';
import { ProviderPortfolioItem } from './entities/provider-portfolio-item.entity';
import { ProviderStatusHistory } from './entities/provider-status-history.entity';
import { ProviderStatus } from './enums/provider-status.enum';
import { RegisterProviderDto } from './dto/register-provider.dto';
import {
  AddProviderCategoryDto,
  AddProviderServiceAreaDto,
  AddProviderSpecialtyDto,
} from './dto/provider-catalog.dto';
import {
  AddProviderCertificationDto,
  AddProviderInsuranceDto,
  AddProviderLicenseDto,
} from './dto/provider-credentials.dto';
import {
  AddProviderPortfolioDto,
  AddProviderPortfolioItemDto,
} from './dto/provider-portfolio.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(ProviderProfile)
    private readonly providerRepository: Repository<ProviderProfile>,
    @InjectRepository(ProviderCategory)
    private readonly categoryRepository: Repository<ProviderCategory>,
    @InjectRepository(ProviderSpecialty)
    private readonly specialtyRepository: Repository<ProviderSpecialty>,
    @InjectRepository(ProviderServiceArea)
    private readonly serviceAreaRepository: Repository<ProviderServiceArea>,
    @InjectRepository(ProviderCertification)
    private readonly certificationRepository: Repository<ProviderCertification>,
    @InjectRepository(ProviderLicense)
    private readonly licenseRepository: Repository<ProviderLicense>,
    @InjectRepository(ProviderInsurance)
    private readonly insuranceRepository: Repository<ProviderInsurance>,
    @InjectRepository(ProviderVerification)
    private readonly verificationRepository: Repository<ProviderVerification>,
    @InjectRepository(ProviderPortfolio)
    private readonly portfolioRepository: Repository<ProviderPortfolio>,
    @InjectRepository(ProviderPortfolioItem)
    private readonly portfolioItemRepository: Repository<ProviderPortfolioItem>,
    @InjectRepository(ProviderStatusHistory)
    private readonly statusHistoryRepository: Repository<ProviderStatusHistory>,
  ) {}

  async register(dto: RegisterProviderDto): Promise<ProviderProfile> {
    const provider = await this.providerRepository.save(
      this.providerRepository.create(dto),
    );
    await this.statusHistoryRepository.save(
      this.statusHistoryRepository.create({
        providerProfileId: provider.id,
        previousStatus: null,
        newStatus: provider.status,
        reason: 'Registro inicial del proveedor.',
      }),
    );
    return provider;
  }

  findAll(
    filters: { categoryCode?: string; country?: string } = {},
  ): Promise<ProviderProfile[]> {
    const query = this.providerRepository
      .createQueryBuilder('provider')
      .where('provider.status = :status', { status: ProviderStatus.ACTIVO })
      .orderBy('provider.ratingAverage', 'DESC');

    if (filters.categoryCode) {
      query
        .innerJoin('provider.categories', 'category')
        .andWhere('category.categoryCode = :categoryCode', {
          categoryCode: filters.categoryCode,
        });
    }

    if (filters.country) {
      query
        .innerJoin('provider.serviceAreas', 'serviceArea')
        .andWhere('serviceArea.country = :country', {
          country: filters.country,
        });
    }

    return query.getMany();
  }

  async findOne(id: string): Promise<ProviderProfile> {
    const provider = await this.providerRepository.findOne({
      where: { id },
      relations: {
        categories: true,
        specialties: true,
        serviceAreas: true,
        certifications: true,
        licenses: true,
        insurances: true,
        portfolios: { items: true },
      },
    });
    if (!provider) {
      throw new NotFoundException(`Proveedor ${id} no encontrado.`);
    }
    return provider;
  }

  async addCategory(providerProfileId: string, dto: AddProviderCategoryDto) {
    await this.findOne(providerProfileId);
    return this.categoryRepository.save(
      this.categoryRepository.create({ ...dto, providerProfileId }),
    );
  }

  async addSpecialty(providerProfileId: string, dto: AddProviderSpecialtyDto) {
    await this.findOne(providerProfileId);
    return this.specialtyRepository.save(
      this.specialtyRepository.create({ ...dto, providerProfileId }),
    );
  }

  async addServiceArea(
    providerProfileId: string,
    dto: AddProviderServiceAreaDto,
  ) {
    await this.findOne(providerProfileId);
    return this.serviceAreaRepository.save(
      this.serviceAreaRepository.create({ ...dto, providerProfileId }),
    );
  }

  async addCertification(
    providerProfileId: string,
    dto: AddProviderCertificationDto,
  ) {
    await this.findOne(providerProfileId);
    return this.certificationRepository.save(
      this.certificationRepository.create({ ...dto, providerProfileId }),
    );
  }

  async addLicense(providerProfileId: string, dto: AddProviderLicenseDto) {
    await this.findOne(providerProfileId);
    return this.licenseRepository.save(
      this.licenseRepository.create({ ...dto, providerProfileId }),
    );
  }

  async addInsurance(providerProfileId: string, dto: AddProviderInsuranceDto) {
    await this.findOne(providerProfileId);
    return this.insuranceRepository.save(
      this.insuranceRepository.create({ ...dto, providerProfileId }),
    );
  }

  async addPortfolio(providerProfileId: string, dto: AddProviderPortfolioDto) {
    await this.findOne(providerProfileId);
    return this.portfolioRepository.save(
      this.portfolioRepository.create({ ...dto, providerProfileId }),
    );
  }

  async addPortfolioItem(
    providerPortfolioId: string,
    dto: AddProviderPortfolioItemDto,
  ) {
    const portfolio = await this.portfolioRepository.findOne({
      where: { id: providerPortfolioId },
    });
    if (!portfolio) {
      throw new NotFoundException(
        `Portafolio ${providerPortfolioId} no encontrado.`,
      );
    }
    return this.portfolioItemRepository.save(
      this.portfolioItemRepository.create({ ...dto, providerPortfolioId }),
    );
  }

  async verify(providerProfileId: string, verifiedBy: string, notes?: string) {
    const provider = await this.findOne(providerProfileId);

    await this.verificationRepository.save(
      this.verificationRepository.create({
        providerProfileId,
        verifiedBy,
        method: 'manual_admin_review',
        notes: notes ?? null,
      }),
    );

    const previousStatus = provider.status;
    provider.status = ProviderStatus.VERIFICADO;
    provider.verifiedAt = new Date();
    const saved = await this.providerRepository.save(provider);

    await this.statusHistoryRepository.save(
      this.statusHistoryRepository.create({
        providerProfileId,
        previousStatus,
        newStatus: ProviderStatus.VERIFICADO,
        changedBy: verifiedBy,
        reason: 'Verificación manual completada.',
      }),
    );

    return saved;
  }

  async activate(providerProfileId: string, actorId: string) {
    const provider = await this.findOne(providerProfileId);
    const previousStatus = provider.status;
    provider.status = ProviderStatus.ACTIVO;
    const saved = await this.providerRepository.save(provider);

    await this.statusHistoryRepository.save(
      this.statusHistoryRepository.create({
        providerProfileId,
        previousStatus,
        newStatus: ProviderStatus.ACTIVO,
        changedBy: actorId,
        reason: 'Activación de perfil de proveedor.',
      }),
    );

    return saved;
  }
}
