import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransportCompany } from './entities/transport-company.entity';
import { TransportVehicle } from './entities/transport-vehicle.entity';
import { TransportDriver } from './entities/transport-driver.entity';
import { TransportDriverCredential } from './entities/transport-driver-credential.entity';
import { TransportVehicleDocument } from './entities/transport-vehicle-document.entity';
import {
  AddDriverCredentialDto,
  AddVehicleDocumentDto,
  CreateCompanyDto,
  CreateDriverDto,
  CreateVehicleDto,
} from './dto/fleet.dto';

@Injectable()
export class TransportFleetService {
  constructor(
    @InjectRepository(TransportCompany)
    private readonly companyRepository: Repository<TransportCompany>,
    @InjectRepository(TransportVehicle)
    private readonly vehicleRepository: Repository<TransportVehicle>,
    @InjectRepository(TransportDriver)
    private readonly driverRepository: Repository<TransportDriver>,
    @InjectRepository(TransportDriverCredential)
    private readonly driverCredentialRepository: Repository<TransportDriverCredential>,
    @InjectRepository(TransportVehicleDocument)
    private readonly vehicleDocumentRepository: Repository<TransportVehicleDocument>,
  ) {}

  createCompany(dto: CreateCompanyDto): Promise<TransportCompany> {
    return this.companyRepository.save(this.companyRepository.create(dto));
  }

  findAllCompanies(): Promise<TransportCompany[]> {
    return this.companyRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async createVehicle(
    companyId: string,
    dto: CreateVehicleDto,
  ): Promise<TransportVehicle> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException(`Transportista ${companyId} no encontrado.`);
    }
    return this.vehicleRepository.save(
      this.vehicleRepository.create({ ...dto, companyId }),
    );
  }

  findVehiclesForCompany(companyId: string): Promise<TransportVehicle[]> {
    return this.vehicleRepository.find({ where: { companyId } });
  }

  async addVehicleDocument(
    vehicleId: string,
    dto: AddVehicleDocumentDto,
  ): Promise<TransportVehicleDocument> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
    });
    if (!vehicle) {
      throw new NotFoundException(`Vehículo ${vehicleId} no encontrado.`);
    }
    return this.vehicleDocumentRepository.save(
      this.vehicleDocumentRepository.create({ ...dto, vehicleId }),
    );
  }

  async createDriver(
    companyId: string,
    dto: CreateDriverDto,
  ): Promise<TransportDriver> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException(`Transportista ${companyId} no encontrado.`);
    }
    return this.driverRepository.save(
      this.driverRepository.create({ ...dto, companyId }),
    );
  }

  findDriversForCompany(companyId: string): Promise<TransportDriver[]> {
    return this.driverRepository.find({ where: { companyId } });
  }

  async addDriverCredential(
    driverId: string,
    dto: AddDriverCredentialDto,
  ): Promise<TransportDriverCredential> {
    const driver = await this.driverRepository.findOne({
      where: { id: driverId },
    });
    if (!driver) {
      throw new NotFoundException(`Conductor ${driverId} no encontrado.`);
    }
    return this.driverCredentialRepository.save(
      this.driverCredentialRepository.create({ ...dto, driverId }),
    );
  }
}
