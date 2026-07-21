import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FunctionalModule } from './entities/functional-module.entity';
import { ModuleProfile } from './entities/module-profile.entity';
import { UseCase } from './entities/use-case.entity';
import { UseCaseStep } from './entities/use-case-step.entity';
import { UseCaseRule } from './entities/use-case-rule.entity';
import {
  AddModuleProfileDto,
  AddUseCaseRuleDto,
  CreateFunctionalModuleDto,
  CreateUseCaseDto,
} from './dto/docs.dto';

@Injectable()
export class AdminDocsService {
  constructor(
    @InjectRepository(FunctionalModule)
    private readonly moduleRepository: Repository<FunctionalModule>,
    @InjectRepository(ModuleProfile)
    private readonly moduleProfileRepository: Repository<ModuleProfile>,
    @InjectRepository(UseCase)
    private readonly useCaseRepository: Repository<UseCase>,
    @InjectRepository(UseCaseStep)
    private readonly useCaseStepRepository: Repository<UseCaseStep>,
    @InjectRepository(UseCaseRule)
    private readonly useCaseRuleRepository: Repository<UseCaseRule>,
  ) {}

  createModule(dto: CreateFunctionalModuleDto): Promise<FunctionalModule> {
    return this.moduleRepository.save(this.moduleRepository.create(dto));
  }

  findAllModules(): Promise<FunctionalModule[]> {
    return this.moduleRepository.find({
      order: { ecosystem: 'ASC', name: 'ASC' },
    });
  }

  async addModuleProfile(
    moduleId: string,
    dto: AddModuleProfileDto,
  ): Promise<ModuleProfile> {
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId },
    });
    if (!module) {
      throw new NotFoundException(
        `Módulo funcional ${moduleId} no encontrado.`,
      );
    }
    return this.moduleProfileRepository.save(
      this.moduleProfileRepository.create({ ...dto, moduleId }),
    );
  }

  async createUseCase(dto: CreateUseCaseDto): Promise<UseCase> {
    const { steps, ...rest } = dto;
    const useCase = await this.useCaseRepository.save(
      this.useCaseRepository.create(rest),
    );

    if (steps?.length) {
      await this.useCaseStepRepository.save(
        steps.map((step) =>
          this.useCaseStepRepository.create({ ...step, useCaseId: useCase.id }),
        ),
      );
    }

    return useCase;
  }

  async findUseCase(id: string): Promise<UseCase> {
    const useCase = await this.useCaseRepository.findOne({
      where: { id },
      relations: { steps: true, rules: true },
    });
    if (!useCase) {
      throw new NotFoundException(`Caso de uso ${id} no encontrado.`);
    }
    return useCase;
  }

  findAllUseCases(): Promise<UseCase[]> {
    return this.useCaseRepository.find({ order: { name: 'ASC' } });
  }

  async addUseCaseRule(
    useCaseId: string,
    dto: AddUseCaseRuleDto,
  ): Promise<UseCaseRule> {
    await this.findUseCase(useCaseId);
    return this.useCaseRuleRepository.save(
      this.useCaseRuleRepository.create({ ...dto, useCaseId }),
    );
  }
}
