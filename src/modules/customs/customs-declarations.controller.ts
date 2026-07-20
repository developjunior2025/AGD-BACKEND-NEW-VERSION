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
import { CustomsDeclarationsService } from './customs-declarations.service';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import {
  AddCustomsObservationDto,
  AddRequirementDto,
  TransitionDeclarationDto,
} from './dto/declaration-detail.dto';

const CUSTOMS_ROLES = [
  ProfileType.AGENTE_ADUANA,
  ProfileType.ANALISTA_SENIAT_SIDUNEA,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Aduanas - Declaraciones')
@ApiBearerAuth()
@Roles(...CUSTOMS_ROLES)
@Controller('customs-declarations')
export class CustomsDeclarationsController {
  constructor(
    private readonly customsDeclarationsService: CustomsDeclarationsService,
  ) {}

  @Post()
  create(@Body() dto: CreateDeclarationDto) {
    return this.customsDeclarationsService.create(dto);
  }

  @Get('by-broker')
  listForBroker(@Query('brokerId', ParseUUIDPipe) brokerId: string) {
    return this.customsDeclarationsService.listForBroker(brokerId);
  }

  @Get('by-importer')
  listForImporter(
    @Query('importerExporterId', ParseUUIDPipe) importerExporterId: string,
  ) {
    return this.customsDeclarationsService.listForImporter(importerExporterId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.customsDeclarationsService.findOne(id);
  }

  @Patch(':id/transition')
  transition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: TransitionDeclarationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.customsDeclarationsService.transition(
      id,
      dto.status,
      user.id,
      dto.reason,
    );
  }

  @Post(':id/requirements')
  addRequirement(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddRequirementDto,
  ) {
    return this.customsDeclarationsService.addRequirement(id, dto);
  }

  @Patch('requirements/:requirementId/complete')
  completeRequirement(
    @Param('requirementId', ParseUUIDPipe) requirementId: string,
  ) {
    return this.customsDeclarationsService.completeRequirement(requirementId);
  }

  @Post(':id/observations')
  addObservation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddCustomsObservationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.customsDeclarationsService.addObservation(id, user.id, dto);
  }

  @Patch('observations/:observationId/close')
  closeObservation(
    @Param('observationId', ParseUUIDPipe) observationId: string,
  ) {
    return this.customsDeclarationsService.closeObservation(observationId);
  }
}
