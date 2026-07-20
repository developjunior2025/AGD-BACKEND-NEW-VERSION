import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { GovernanceMatrix } from './entities/governance-matrix.entity';
import { GovernanceMatrixRule } from './entities/governance-matrix-rule.entity';
import {
  GovernanceAccessLevel,
  GovernanceAction,
} from './enums/document-governance.enums';
import { AddMatrixRuleDto, CreateMatrixDto } from './dto/governance-matrix.dto';

@Injectable()
export class GovernanceMatrixService {
  constructor(
    @InjectRepository(GovernanceMatrix)
    private readonly matrixRepository: Repository<GovernanceMatrix>,
    @InjectRepository(GovernanceMatrixRule)
    private readonly ruleRepository: Repository<GovernanceMatrixRule>,
  ) {}

  create(dto: CreateMatrixDto): Promise<GovernanceMatrix> {
    return this.matrixRepository.save(this.matrixRepository.create(dto));
  }

  async findOne(id: string): Promise<GovernanceMatrix> {
    const matrix = await this.matrixRepository.findOne({
      where: { id },
      relations: { rules: true },
    });
    if (!matrix) {
      throw new NotFoundException(`Matriz de gobernanza ${id} no encontrada.`);
    }
    return matrix;
  }

  async addRule(
    matrixId: string,
    dto: AddMatrixRuleDto,
  ): Promise<GovernanceMatrixRule> {
    await this.findOne(matrixId);
    return this.ruleRepository.save(
      this.ruleRepository.create({
        ...dto,
        matrixId,
        documentTypeId: dto.documentTypeId ?? null,
      }),
    );
  }

  /**
   * Fuente única de permisos documentales (regla §10): resuelve el nivel de
   * acceso de un perfil sobre una acción, priorizando reglas específicas del
   * tipo documental sobre reglas generales (documentTypeId nulo).
   */
  async checkAccess(
    profileType: string,
    action: GovernanceAction,
    documentTypeId?: string,
  ): Promise<GovernanceAccessLevel> {
    const specificRule = documentTypeId
      ? await this.ruleRepository.findOne({
          where: { profileType, action, documentTypeId },
        })
      : null;

    if (specificRule) {
      return specificRule.accessLevel;
    }

    const generalRule = await this.ruleRepository.findOne({
      where: { profileType, action, documentTypeId: IsNull() },
    });

    return generalRule?.accessLevel ?? GovernanceAccessLevel.NO_APLICA;
  }
}
