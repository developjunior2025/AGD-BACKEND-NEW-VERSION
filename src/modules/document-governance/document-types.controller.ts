import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import { FurStatus } from '../fur/enums/fur-status.enum';
import { DocumentTypesService } from './document-types.service';
import { CreateDocumentTypeDto } from './dto/document-type.dto';
import {
  AddTemplateFieldDto,
  AddTemplateRuleDto,
  CreateDocumentTemplateDto,
} from './dto/document-template.dto';
import { CreateRetentionRuleDto } from './dto/retention-rule.dto';

const GOVERNANCE_ROLES = [
  ProfileType.SUPERADMINISTRADOR,
  ProfileType.ADMINISTRADOR_DOCUMENTAL,
];

@ApiTags('Gobernanza - Tipos y plantillas')
@ApiBearerAuth()
@Roles(...GOVERNANCE_ROLES)
@Controller()
export class DocumentTypesController {
  constructor(private readonly documentTypesService: DocumentTypesService) {}

  @Post('document-types')
  createType(@Body() dto: CreateDocumentTypeDto) {
    return this.documentTypesService.createType(dto);
  }

  @Get('document-types')
  findAllTypes() {
    return this.documentTypesService.findAllTypes();
  }

  @Get('document-types/:id')
  findType(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentTypesService.findType(id);
  }

  @Post('document-templates')
  createTemplate(@Body() dto: CreateDocumentTemplateDto) {
    return this.documentTypesService.createTemplate(dto);
  }

  @Get('document-templates/:id')
  findTemplate(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentTypesService.findTemplate(id);
  }

  @Post('document-templates/:id/fields')
  addField(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddTemplateFieldDto,
  ) {
    return this.documentTypesService.addField(id, dto);
  }

  @Post('document-templates/:id/rules')
  addRule(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddTemplateRuleDto,
  ) {
    return this.documentTypesService.addRule(id, dto);
  }

  @Patch('document-templates/:id/submit-review')
  submitTemplateReview(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentTypesService.transitionTemplate(
      id,
      FurStatus.EN_REVISION,
    );
  }

  @Patch('document-templates/:id/approve')
  approveTemplate(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentTypesService.transitionTemplate(id, FurStatus.APROBADO);
  }

  @Patch('document-templates/:id/publish')
  publishTemplate(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentTypesService.transitionTemplate(
      id,
      FurStatus.PUBLICADO,
    );
  }

  @Patch('document-templates/:id/obsolete')
  obsoleteTemplate(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentTypesService.transitionTemplate(id, FurStatus.OBSOLETO);
  }

  @Post('document-retention-rules')
  createRetentionRule(@Body() dto: CreateRetentionRuleDto) {
    return this.documentTypesService.createRetentionRule(dto);
  }

  @Get('document-retention-rules')
  findRetentionRule(
    @Query('documentTypeId', ParseUUIDPipe) documentTypeId: string,
  ) {
    return this.documentTypesService.findRetentionRule(documentTypeId);
  }
}
