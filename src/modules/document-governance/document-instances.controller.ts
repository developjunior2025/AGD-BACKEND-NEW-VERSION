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
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { DocumentInstancesService } from './document-instances.service';
import {
  AddDocumentObservationDto,
  AddDocumentRemediationDto,
  CreateDocumentInstanceDto,
  DecideDocumentDto,
  SignDocumentDto,
} from './dto/document-instance.dto';

const GOVERNANCE_ROLES = [
  ProfileType.SUPERADMINISTRADOR,
  ProfileType.ADMINISTRADOR_DOCUMENTAL,
];

@ApiTags('Gobernanza - Documentos')
@ApiBearerAuth()
@Controller('document-instances')
export class DocumentInstancesController {
  constructor(
    private readonly documentInstancesService: DocumentInstancesService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateDocumentInstanceDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.create(dto, user.id);
  }

  @Get('by-source')
  findBySource(
    @Query('sourceEntityType') sourceEntityType: string,
    @Query('sourceEntityId') sourceEntityId: string,
  ) {
    return this.documentInstancesService.findBySource(
      sourceEntityType,
      sourceEntityId,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.documentInstancesService.findOne(id);
  }

  @Patch(':id/submit-review')
  submitForReview(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.submitForReview(id, user.id);
  }

  @Patch(':id/approve')
  @Roles(...GOVERNANCE_ROLES)
  approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: DecideDocumentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.approve(id, user.id, dto.comments);
  }

  @Patch(':id/reject')
  @Roles(...GOVERNANCE_ROLES)
  reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: DecideDocumentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.reject(id, user.id, dto.comments);
  }

  @Patch(':id/publish')
  @Roles(...GOVERNANCE_ROLES)
  publish(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.publish(id, user.id);
  }

  @Patch(':id/obsolete')
  @Roles(...GOVERNANCE_ROLES)
  markObsolete(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.markObsolete(id, user.id);
  }

  @Post(':id/sign')
  sign(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SignDocumentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.sign(id, user.id, dto);
  }

  @Post(':id/observations')
  addObservation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddDocumentObservationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.addObservation(id, user.id, dto);
  }

  @Post('observations/:observationId/remediations')
  addRemediation(
    @Param('observationId', ParseUUIDPipe) observationId: string,
    @Body() dto: AddDocumentRemediationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.documentInstancesService.addRemediation(
      observationId,
      user.id,
      dto,
    );
  }

  @Patch('remediations/:remediationId/accept')
  @Roles(...GOVERNANCE_ROLES)
  acceptRemediation(
    @Param('remediationId', ParseUUIDPipe) remediationId: string,
  ) {
    return this.documentInstancesService.decideRemediation(remediationId, true);
  }

  @Patch('remediations/:remediationId/reject')
  @Roles(...GOVERNANCE_ROLES)
  rejectRemediation(
    @Param('remediationId', ParseUUIDPipe) remediationId: string,
  ) {
    return this.documentInstancesService.decideRemediation(
      remediationId,
      false,
    );
  }
}
