import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseTableCatalog } from './entities/database-table-catalog.entity';
import { DatabaseFieldCatalog } from './entities/database-field-catalog.entity';
import { ApiEndpointCatalog } from './entities/api-endpoint-catalog.entity';
import { BusinessRuleCatalog } from './entities/business-rule-catalog.entity';
import { GlobalParameter } from './entities/global-parameter.entity';
import { TechnicalCatalog } from './entities/technical-catalog.entity';
import {
  AddDatabaseFieldDto,
  AddTechnicalCatalogEntryDto,
  CreateApiEndpointDto,
  CreateBusinessRuleDto,
  CreateDatabaseTableCatalogDto,
  SetGlobalParameterDto,
} from './dto/catalog.dto';

@Injectable()
export class AdminCatalogService {
  constructor(
    @InjectRepository(DatabaseTableCatalog)
    private readonly tableRepository: Repository<DatabaseTableCatalog>,
    @InjectRepository(DatabaseFieldCatalog)
    private readonly fieldRepository: Repository<DatabaseFieldCatalog>,
    @InjectRepository(ApiEndpointCatalog)
    private readonly endpointRepository: Repository<ApiEndpointCatalog>,
    @InjectRepository(BusinessRuleCatalog)
    private readonly ruleRepository: Repository<BusinessRuleCatalog>,
    @InjectRepository(GlobalParameter)
    private readonly parameterRepository: Repository<GlobalParameter>,
    @InjectRepository(TechnicalCatalog)
    private readonly technicalCatalogRepository: Repository<TechnicalCatalog>,
  ) {}

  createTable(
    dto: CreateDatabaseTableCatalogDto,
  ): Promise<DatabaseTableCatalog> {
    return this.tableRepository.save(this.tableRepository.create(dto));
  }

  findAllTables(): Promise<DatabaseTableCatalog[]> {
    return this.tableRepository.find({ order: { technicalName: 'ASC' } });
  }

  async addField(
    tableId: string,
    dto: AddDatabaseFieldDto,
  ): Promise<DatabaseFieldCatalog> {
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
    });
    if (!table) {
      throw new NotFoundException(
        `Tabla ${tableId} no encontrada en el catálogo.`,
      );
    }
    return this.fieldRepository.save(
      this.fieldRepository.create({ ...dto, tableId }),
    );
  }

  createEndpoint(dto: CreateApiEndpointDto): Promise<ApiEndpointCatalog> {
    return this.endpointRepository.save(this.endpointRepository.create(dto));
  }

  findAllEndpoints(): Promise<ApiEndpointCatalog[]> {
    return this.endpointRepository.find({ order: { path: 'ASC' } });
  }

  createBusinessRule(dto: CreateBusinessRuleDto): Promise<BusinessRuleCatalog> {
    return this.ruleRepository.save(this.ruleRepository.create(dto));
  }

  findAllBusinessRules(): Promise<BusinessRuleCatalog[]> {
    return this.ruleRepository.find({ order: { code: 'ASC' } });
  }

  async setGlobalParameter(
    dto: SetGlobalParameterDto,
  ): Promise<GlobalParameter> {
    let parameter = await this.parameterRepository.findOne({
      where: { key: dto.key },
    });
    if (!parameter) {
      parameter = this.parameterRepository.create({ key: dto.key });
    }
    Object.assign(parameter, dto);
    return this.parameterRepository.save(parameter);
  }

  findAllGlobalParameters(): Promise<GlobalParameter[]> {
    return this.parameterRepository.find({ order: { key: 'ASC' } });
  }

  async addTechnicalCatalogEntry(
    dto: AddTechnicalCatalogEntryDto,
  ): Promise<TechnicalCatalog> {
    const existing = await this.technicalCatalogRepository.findOne({
      where: { catalogName: dto.catalogName, catalogKey: dto.catalogKey },
    });
    if (existing) {
      throw new ConflictException(
        `Ya existe la clave "${dto.catalogKey}" en el catálogo "${dto.catalogName}".`,
      );
    }
    return this.technicalCatalogRepository.save(
      this.technicalCatalogRepository.create(dto),
    );
  }

  findCatalogEntries(catalogName: string): Promise<TechnicalCatalog[]> {
    return this.technicalCatalogRepository.find({ where: { catalogName } });
  }
}
