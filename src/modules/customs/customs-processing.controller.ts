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
import { CustomsProcessingService } from './customs-processing.service';
import {
  AddTaxItemDto,
  AssignChannelDto,
  CreateRiskProfileDto,
  MarkTaxPaidDto,
  ScheduleInspectionDto,
  SetValuationDto,
} from './dto/processing.dto';
import {
  AddInspectionResultDto,
  AuthorizeReleaseDto,
} from './dto/inspection-result.dto';

const CUSTOMS_ROLES = [
  ProfileType.AGENTE_ADUANA,
  ProfileType.ANALISTA_SENIAT_SIDUNEA,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Aduanas - Procesamiento')
@ApiBearerAuth()
@Roles(...CUSTOMS_ROLES)
@Controller('customs-declarations/:declarationId')
export class CustomsProcessingController {
  constructor(
    private readonly customsProcessingService: CustomsProcessingService,
  ) {}

  @Post('valuation')
  setValuation(
    @Param('declarationId', ParseUUIDPipe) declarationId: string,
    @Body() dto: SetValuationDto,
  ) {
    return this.customsProcessingService.setValuation(declarationId, dto);
  }

  @Get('valuation')
  getValuation(@Param('declarationId', ParseUUIDPipe) declarationId: string) {
    return this.customsProcessingService.getValuation(declarationId);
  }

  @Post('tax-items')
  addTaxItem(
    @Param('declarationId', ParseUUIDPipe) declarationId: string,
    @Body() dto: AddTaxItemDto,
  ) {
    return this.customsProcessingService.addTaxItem(declarationId, dto);
  }

  @Get('tax-settlement')
  getSettlement(@Param('declarationId', ParseUUIDPipe) declarationId: string) {
    return this.customsProcessingService.getSettlement(declarationId);
  }

  @Patch('tax-settlement/pay')
  markTaxPaid(
    @Param('declarationId', ParseUUIDPipe) declarationId: string,
    @Body() dto: MarkTaxPaidDto,
  ) {
    return this.customsProcessingService.markTaxPaid(declarationId, dto);
  }

  @Post('selectivity-channel')
  assignChannel(
    @Param('declarationId', ParseUUIDPipe) declarationId: string,
    @Body() dto: AssignChannelDto,
  ) {
    return this.customsProcessingService.assignChannel(declarationId, dto);
  }

  @Post('inspections')
  scheduleInspection(
    @Param('declarationId', ParseUUIDPipe) declarationId: string,
    @Body() dto: ScheduleInspectionDto,
  ) {
    return this.customsProcessingService.scheduleInspection(declarationId, dto);
  }

  @Post('release')
  authorizeRelease(
    @Param('declarationId', ParseUUIDPipe) declarationId: string,
    @Body() dto: AuthorizeReleaseDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.customsProcessingService.authorizeRelease(
      declarationId,
      user.id,
      dto,
    );
  }

  @Get('release')
  getRelease(@Param('declarationId', ParseUUIDPipe) declarationId: string) {
    return this.customsProcessingService.getRelease(declarationId);
  }
}

@ApiTags('Aduanas - Procesamiento')
@ApiBearerAuth()
@Roles(...CUSTOMS_ROLES)
@Controller('customs-risk-profiles')
export class CustomsRiskProfilesController {
  constructor(
    private readonly customsProcessingService: CustomsProcessingService,
  ) {}

  @Post()
  create(@Body() dto: CreateRiskProfileDto) {
    return this.customsProcessingService.createRiskProfile(dto);
  }

  @Get()
  findLatest(
    @Query('importerExporterId', ParseUUIDPipe) importerExporterId: string,
  ) {
    return this.customsProcessingService.findLatestRiskProfile(
      importerExporterId,
    );
  }
}

@ApiTags('Aduanas - Procesamiento')
@ApiBearerAuth()
@Roles(...CUSTOMS_ROLES)
@Controller('customs-inspections')
export class CustomsInspectionsController {
  constructor(
    private readonly customsProcessingService: CustomsProcessingService,
  ) {}

  @Post(':inspectionId/results')
  addResult(
    @Param('inspectionId', ParseUUIDPipe) inspectionId: string,
    @Body() dto: AddInspectionResultDto,
  ) {
    return this.customsProcessingService.addInspectionResult(inspectionId, dto);
  }
}
