import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WmsProduct } from './entities/wms-product.entity';
import { WmsSku } from './entities/wms-sku.entity';
import { WmsLot } from './entities/wms-lot.entity';
import { WmsSerial } from './entities/wms-serial.entity';
import { WmsWarehouse } from './entities/wms-warehouse.entity';
import { WmsZone } from './entities/wms-zone.entity';
import { WmsRack } from './entities/wms-rack.entity';
import { WmsLocation } from './entities/wms-location.entity';
import {
  CreateLotDto,
  CreateProductDto,
  CreateSerialDto,
  CreateSkuDto,
} from './dto/catalog.dto';
import {
  CreateLocationDto,
  CreateRackDto,
  CreateWarehouseDto,
  CreateZoneDto,
} from './dto/location.dto';

@Injectable()
export class WmsCatalogService {
  constructor(
    @InjectRepository(WmsProduct)
    private readonly productRepository: Repository<WmsProduct>,
    @InjectRepository(WmsSku)
    private readonly skuRepository: Repository<WmsSku>,
    @InjectRepository(WmsLot)
    private readonly lotRepository: Repository<WmsLot>,
    @InjectRepository(WmsSerial)
    private readonly serialRepository: Repository<WmsSerial>,
    @InjectRepository(WmsWarehouse)
    private readonly warehouseRepository: Repository<WmsWarehouse>,
    @InjectRepository(WmsZone)
    private readonly zoneRepository: Repository<WmsZone>,
    @InjectRepository(WmsRack)
    private readonly rackRepository: Repository<WmsRack>,
    @InjectRepository(WmsLocation)
    private readonly locationRepository: Repository<WmsLocation>,
  ) {}

  createProduct(dto: CreateProductDto): Promise<WmsProduct> {
    return this.productRepository.save(this.productRepository.create(dto));
  }

  findAllProducts(): Promise<WmsProduct[]> {
    return this.productRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  createSku(dto: CreateSkuDto): Promise<WmsSku> {
    return this.skuRepository.save(this.skuRepository.create(dto));
  }

  findAllSkus(): Promise<WmsSku[]> {
    return this.skuRepository.find({
      where: { isActive: true },
      order: { code: 'ASC' },
    });
  }

  async findSku(id: string): Promise<WmsSku> {
    const sku = await this.skuRepository.findOne({ where: { id } });
    if (!sku) {
      throw new NotFoundException(`SKU ${id} no encontrado.`);
    }
    return sku;
  }

  createLot(dto: CreateLotDto): Promise<WmsLot> {
    return this.lotRepository.save(this.lotRepository.create(dto));
  }

  findLotsForSku(skuId: string): Promise<WmsLot[]> {
    return this.lotRepository.find({ where: { skuId } });
  }

  createSerial(dto: CreateSerialDto): Promise<WmsSerial> {
    return this.serialRepository.save(this.serialRepository.create(dto));
  }

  findSerialsForSku(skuId: string): Promise<WmsSerial[]> {
    return this.serialRepository.find({ where: { skuId } });
  }

  createWarehouse(dto: CreateWarehouseDto): Promise<WmsWarehouse> {
    return this.warehouseRepository.save(this.warehouseRepository.create(dto));
  }

  findAllWarehouses(): Promise<WmsWarehouse[]> {
    return this.warehouseRepository.find({ order: { name: 'ASC' } });
  }

  async createZone(warehouseId: string, dto: CreateZoneDto): Promise<WmsZone> {
    const warehouse = await this.warehouseRepository.findOne({
      where: { id: warehouseId },
    });
    if (!warehouse) {
      throw new NotFoundException(`Almacén ${warehouseId} no encontrado.`);
    }
    return this.zoneRepository.save(
      this.zoneRepository.create({ ...dto, warehouseId }),
    );
  }

  findZonesForWarehouse(warehouseId: string): Promise<WmsZone[]> {
    return this.zoneRepository.find({ where: { warehouseId } });
  }

  async createRack(zoneId: string, dto: CreateRackDto): Promise<WmsRack> {
    const zone = await this.zoneRepository.findOne({ where: { id: zoneId } });
    if (!zone) {
      throw new NotFoundException(`Zona ${zoneId} no encontrada.`);
    }
    return this.rackRepository.save(
      this.rackRepository.create({ ...dto, zoneId }),
    );
  }

  createLocation(dto: CreateLocationDto): Promise<WmsLocation> {
    return this.locationRepository.save(this.locationRepository.create(dto));
  }

  async findLocation(id: string): Promise<WmsLocation> {
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      throw new NotFoundException(`Ubicación ${id} no encontrada.`);
    }
    return location;
  }

  findLocationsForZone(zoneId: string): Promise<WmsLocation[]> {
    return this.locationRepository.find({ where: { zoneId } });
  }
}
