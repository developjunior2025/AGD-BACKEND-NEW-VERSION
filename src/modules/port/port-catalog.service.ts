import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortVessel } from './entities/port-vessel.entity';
import { PortEquipment } from './entities/port-equipment.entity';
import { PortYard } from './entities/port-yard.entity';
import { PortYardSlot } from './entities/port-yard-slot.entity';
import {
  CreateEquipmentDto,
  CreateVesselDto,
  CreateYardDto,
  CreateYardSlotDto,
} from './dto/catalog.dto';

@Injectable()
export class PortCatalogService {
  constructor(
    @InjectRepository(PortVessel)
    private readonly vesselRepository: Repository<PortVessel>,
    @InjectRepository(PortEquipment)
    private readonly equipmentRepository: Repository<PortEquipment>,
    @InjectRepository(PortYard)
    private readonly yardRepository: Repository<PortYard>,
    @InjectRepository(PortYardSlot)
    private readonly yardSlotRepository: Repository<PortYardSlot>,
  ) {}

  createVessel(dto: CreateVesselDto): Promise<PortVessel> {
    return this.vesselRepository.save(this.vesselRepository.create(dto));
  }

  findAllVessels(): Promise<PortVessel[]> {
    return this.vesselRepository.find({ order: { name: 'ASC' } });
  }

  createEquipment(dto: CreateEquipmentDto): Promise<PortEquipment> {
    return this.equipmentRepository.save(this.equipmentRepository.create(dto));
  }

  findAllEquipment(): Promise<PortEquipment[]> {
    return this.equipmentRepository.find({ order: { name: 'ASC' } });
  }

  createYard(dto: CreateYardDto): Promise<PortYard> {
    return this.yardRepository.save(this.yardRepository.create(dto));
  }

  async findYard(id: string): Promise<PortYard> {
    const yard = await this.yardRepository.findOne({
      where: { id },
      relations: { slots: true },
    });
    if (!yard) {
      throw new NotFoundException(`Patio ${id} no encontrado.`);
    }
    return yard;
  }

  findAllYards(): Promise<PortYard[]> {
    return this.yardRepository.find({ order: { name: 'ASC' } });
  }

  async addYardSlot(
    yardId: string,
    dto: CreateYardSlotDto,
  ): Promise<PortYardSlot> {
    await this.findYard(yardId);
    return this.yardSlotRepository.save(
      this.yardSlotRepository.create({ ...dto, yardId }),
    );
  }
}
