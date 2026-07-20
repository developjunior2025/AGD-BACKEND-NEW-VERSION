import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FurType } from './entities/fur-type.entity';
import { CreateFurTypeDto } from './dto/create-fur-type.dto';

@Injectable()
export class FurTypesService {
  constructor(
    @InjectRepository(FurType)
    private readonly furTypeRepository: Repository<FurType>,
  ) {}

  create(dto: CreateFurTypeDto): Promise<FurType> {
    const furType = this.furTypeRepository.create(dto);
    return this.furTypeRepository.save(furType);
  }

  findAll(): Promise<FurType[]> {
    return this.furTypeRepository.find({ order: { name: 'ASC' } });
  }

  async findOne(id: string): Promise<FurType> {
    const furType = await this.furTypeRepository.findOne({ where: { id } });
    if (!furType) {
      throw new NotFoundException(`Tipo de FUR ${id} no encontrado.`);
    }
    return furType;
  }
}
