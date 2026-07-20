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
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { CargoFilesService } from './cargo-files.service';
import { CreateCargoFileDto } from './dto/create-cargo-file.dto';
import { TransitionCargoFileDto } from './dto/transition-cargo-file.dto';
import {
  AddAlertDto,
  AddCargoFileDocumentDto,
  AddCargoFilePartyDto,
  AddChecklistItemDto,
  AddMilestoneDto,
  CreateChecklistDto,
} from './dto/cargo-file-detail.dto';

@ApiTags('Expedientes de carga')
@ApiBearerAuth()
@Controller('cargo-files')
export class CargoFilesController {
  constructor(private readonly cargoFilesService: CargoFilesService) {}

  @Post()
  create(
    @Body() dto: CreateCargoFileDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.cargoFilesService.create(user.id, dto);
  }

  @Get('me')
  listMine(@CurrentUser() user: AuthenticatedUser) {
    return this.cargoFilesService.listForClient(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cargoFilesService.findOne(id);
  }

  @Patch(':id/transition')
  transition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: TransitionCargoFileDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.cargoFilesService.transition(
      id,
      dto.status,
      user.id,
      dto.reason,
    );
  }

  @Post(':id/parties')
  addParty(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddCargoFilePartyDto,
  ) {
    return this.cargoFilesService.addParty(id, dto);
  }

  @Post(':id/documents')
  addDocument(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddCargoFileDocumentDto,
  ) {
    return this.cargoFilesService.addDocument(id, dto);
  }

  @Post(':id/checklists')
  createChecklist(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateChecklistDto,
  ) {
    return this.cargoFilesService.createChecklist(id, dto);
  }

  @Post('checklists/:checklistId/items')
  addChecklistItem(
    @Param('checklistId', ParseUUIDPipe) checklistId: string,
    @Body() dto: AddChecklistItemDto,
  ) {
    return this.cargoFilesService.addChecklistItem(checklistId, dto);
  }

  @Patch('checklist-items/:itemId/complete')
  completeChecklistItem(@Param('itemId', ParseUUIDPipe) itemId: string) {
    return this.cargoFilesService.completeChecklistItem(itemId);
  }

  @Post(':id/milestones')
  addMilestone(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddMilestoneDto,
  ) {
    return this.cargoFilesService.addMilestone(id, dto);
  }

  @Patch('milestones/:milestoneId/complete')
  completeMilestone(@Param('milestoneId', ParseUUIDPipe) milestoneId: string) {
    return this.cargoFilesService.completeMilestone(milestoneId);
  }

  @Post(':id/alerts')
  addAlert(@Param('id', ParseUUIDPipe) id: string, @Body() dto: AddAlertDto) {
    return this.cargoFilesService.addAlert(id, dto);
  }

  @Patch('alerts/:alertId/resolve')
  resolveAlert(@Param('alertId', ParseUUIDPipe) alertId: string) {
    return this.cargoFilesService.resolveAlert(alertId);
  }
}
