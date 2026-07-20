import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomsRegime } from './entities/customs-regime.entity';
import { CustomsTariffClassification } from './entities/customs-tariff-classification.entity';
import { CustomsBrokerAuthorization } from './entities/customs-broker-authorization.entity';
import {
  CreateBrokerAuthorizationDto,
  CreateRegimeDto,
  CreateTariffClassificationDto,
} from './dto/catalog.dto';

@Injectable()
export class CustomsCatalogService {
  constructor(
    @InjectRepository(CustomsRegime)
    private readonly regimeRepository: Repository<CustomsRegime>,
    @InjectRepository(CustomsTariffClassification)
    private readonly tariffRepository: Repository<CustomsTariffClassification>,
    @InjectRepository(CustomsBrokerAuthorization)
    private readonly brokerAuthRepository: Repository<CustomsBrokerAuthorization>,
  ) {}

  createRegime(dto: CreateRegimeDto): Promise<CustomsRegime> {
    return this.regimeRepository.save(this.regimeRepository.create(dto));
  }

  findAllRegimes(): Promise<CustomsRegime[]> {
    return this.regimeRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  createTariffClassification(
    dto: CreateTariffClassificationDto,
  ): Promise<CustomsTariffClassification> {
    return this.tariffRepository.save(this.tariffRepository.create(dto));
  }

  findAllTariffClassifications(): Promise<CustomsTariffClassification[]> {
    return this.tariffRepository.find({
      where: { isActive: true },
      order: { code: 'ASC' },
    });
  }

  async findTariffClassification(
    id: string,
  ): Promise<CustomsTariffClassification> {
    const classification = await this.tariffRepository.findOne({
      where: { id },
    });
    if (!classification) {
      throw new NotFoundException(
        `Clasificación arancelaria ${id} no encontrada.`,
      );
    }
    return classification;
  }

  createBrokerAuthorization(
    dto: CreateBrokerAuthorizationDto,
  ): Promise<CustomsBrokerAuthorization> {
    return this.brokerAuthRepository.save(
      this.brokerAuthRepository.create(dto),
    );
  }

  findBrokerAuthorizations(
    brokerId: string,
  ): Promise<CustomsBrokerAuthorization[]> {
    return this.brokerAuthRepository.find({ where: { brokerId } });
  }
}
