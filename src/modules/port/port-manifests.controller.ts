import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { PortManifestsService } from './port-manifests.service';
import {
  AddDiscrepancyDto,
  CreateManifestDto,
  ManifestItemDto,
  ReconcileManifestDto,
} from './dto/manifest.dto';

const PORT_ROLES = [
  ProfileType.OPERADOR_PORTUARIO,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Puerto - Manifiestos')
@ApiBearerAuth()
@Roles(...PORT_ROLES)
@Controller()
export class PortManifestsController {
  constructor(private readonly portManifestsService: PortManifestsService) {}

  @Post('port-voyages/:voyageId/manifests')
  create(
    @Param('voyageId', ParseUUIDPipe) voyageId: string,
    @Body() dto: CreateManifestDto,
  ) {
    return this.portManifestsService.create(voyageId, dto);
  }

  @Get('port-manifests/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.portManifestsService.findOne(id);
  }

  @Post('port-manifests/:id/items')
  addItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ManifestItemDto,
  ) {
    return this.portManifestsService.addItem(id, dto);
  }

  @Post('port-manifests/:id/reconciliations')
  reconcile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReconcileManifestDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.portManifestsService.reconcile(id, user.id, dto);
  }

  @Post('port-manifest-reconciliations/:reconciliationId/discrepancies')
  addDiscrepancy(
    @Param('reconciliationId', ParseUUIDPipe) reconciliationId: string,
    @Body() dto: AddDiscrepancyDto,
  ) {
    return this.portManifestsService.addDiscrepancy(reconciliationId, dto);
  }

  @Patch('port-discrepancies/:id/resolve')
  resolveDiscrepancy(@Param('id', ParseUUIDPipe) id: string) {
    return this.portManifestsService.resolveDiscrepancy(id);
  }
}
