import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentType } from './entities/document-type.entity';
import { DocumentTemplate } from './entities/document-template.entity';
import { DocumentTemplateField } from './entities/document-template-field.entity';
import { DocumentTemplateRule } from './entities/document-template-rule.entity';
import { DocumentRetentionRule } from './entities/document-retention-rule.entity';
import { FurStatus } from '../fur/enums/fur-status.enum';
import { CreateDocumentTypeDto } from './dto/document-type.dto';
import {
  AddTemplateFieldDto,
  AddTemplateRuleDto,
  CreateDocumentTemplateDto,
} from './dto/document-template.dto';
import { CreateRetentionRuleDto } from './dto/retention-rule.dto';

const TEMPLATE_TRANSITIONS: Record<FurStatus, FurStatus[]> = {
  [FurStatus.BORRADOR]: [FurStatus.EN_REVISION],
  [FurStatus.EN_REVISION]: [FurStatus.APROBADO, FurStatus.BORRADOR],
  [FurStatus.APROBADO]: [FurStatus.PUBLICADO],
  [FurStatus.PUBLICADO]: [FurStatus.OBSOLETO],
  [FurStatus.OBSOLETO]: [],
};

@Injectable()
export class DocumentTypesService {
  constructor(
    @InjectRepository(DocumentType)
    private readonly typeRepository: Repository<DocumentType>,
    @InjectRepository(DocumentTemplate)
    private readonly templateRepository: Repository<DocumentTemplate>,
    @InjectRepository(DocumentTemplateField)
    private readonly fieldRepository: Repository<DocumentTemplateField>,
    @InjectRepository(DocumentTemplateRule)
    private readonly ruleRepository: Repository<DocumentTemplateRule>,
    @InjectRepository(DocumentRetentionRule)
    private readonly retentionRepository: Repository<DocumentRetentionRule>,
  ) {}

  createType(dto: CreateDocumentTypeDto): Promise<DocumentType> {
    return this.typeRepository.save(this.typeRepository.create(dto));
  }

  findAllTypes(): Promise<DocumentType[]> {
    return this.typeRepository.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
  }

  async findType(id: string): Promise<DocumentType> {
    const type = await this.typeRepository.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException(`Tipo documental ${id} no encontrado.`);
    }
    return type;
  }

  async createTemplate(
    dto: CreateDocumentTemplateDto,
  ): Promise<DocumentTemplate> {
    await this.findType(dto.documentTypeId);
    return this.templateRepository.save(this.templateRepository.create(dto));
  }

  async findTemplate(id: string): Promise<DocumentTemplate> {
    const template = await this.templateRepository.findOne({
      where: { id },
      relations: { fields: true, rules: true },
    });
    if (!template) {
      throw new NotFoundException(`Plantilla ${id} no encontrada.`);
    }
    return template;
  }

  async addField(
    templateId: string,
    dto: AddTemplateFieldDto,
  ): Promise<DocumentTemplateField> {
    await this.findTemplate(templateId);
    return this.fieldRepository.save(
      this.fieldRepository.create({ ...dto, templateId }),
    );
  }

  async addRule(
    templateId: string,
    dto: AddTemplateRuleDto,
  ): Promise<DocumentTemplateRule> {
    await this.findTemplate(templateId);
    return this.ruleRepository.save(
      this.ruleRepository.create({ ...dto, templateId }),
    );
  }

  async transitionTemplate(
    id: string,
    nextStatus: FurStatus,
  ): Promise<DocumentTemplate> {
    const template = await this.findTemplate(id);
    const allowed = TEMPLATE_TRANSITIONS[template.status];
    if (!allowed.includes(nextStatus)) {
      throw new BadRequestException(
        `No se puede pasar la plantilla de "${template.status}" a "${nextStatus}".`,
      );
    }
    template.status = nextStatus;
    if (nextStatus === FurStatus.PUBLICADO) {
      template.publishedAt = new Date();
    }
    return this.templateRepository.save(template);
  }

  createRetentionRule(
    dto: CreateRetentionRuleDto,
  ): Promise<DocumentRetentionRule> {
    return this.retentionRepository.save(this.retentionRepository.create(dto));
  }

  findRetentionRule(
    documentTypeId: string,
  ): Promise<DocumentRetentionRule | null> {
    return this.retentionRepository.findOne({ where: { documentTypeId } });
  }
}
