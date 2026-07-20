import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceCategory } from './entities/service-category.entity';
import { ServiceSubcategory } from './entities/service-subcategory.entity';
import {
  CreateServiceCategoryDto,
  CreateServiceSubcategoryDto,
} from './dto/create-service-category.dto';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategory)
    private readonly categoryRepository: Repository<ServiceCategory>,
    @InjectRepository(ServiceSubcategory)
    private readonly subcategoryRepository: Repository<ServiceSubcategory>,
  ) {}

  create(dto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    return this.categoryRepository.save(this.categoryRepository.create(dto));
  }

  findAll(): Promise<ServiceCategory[]> {
    return this.categoryRepository.find({
      where: { isActive: true },
      relations: { subcategories: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<ServiceCategory> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { subcategories: true },
    });
    if (!category) {
      throw new NotFoundException(`Categoría ${id} no encontrada.`);
    }
    return category;
  }

  async addSubcategory(
    categoryId: string,
    dto: CreateServiceSubcategoryDto,
  ): Promise<ServiceSubcategory> {
    await this.findOne(categoryId);
    return this.subcategoryRepository.save(
      this.subcategoryRepository.create({ ...dto, categoryId }),
    );
  }
}
