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
import { AgdCustodyService } from './agd-custody.service';
import { CreateWarehouseDto } from './dto/catalog.dto';
import { CompleteReceptionDto, CreateEntryRequestDto } from './dto/entry.dto';
import { AddCustodyMovementDto, CreateCustodyLotDto } from './dto/custody.dto';
import { CloseAgdOperationDto } from './dto/dispatch.dto';

const AGD_ROLES = [ProfileType.OPERADOR_AGD, ProfileType.SUPERADMINISTRADOR];

@ApiTags('AGD - Custodia')
@ApiBearerAuth()
@Controller()
export class AgdCustodyController {
  constructor(private readonly agdCustodyService: AgdCustodyService) {}

  @Post('agd-warehouses')
  @Roles(ProfileType.SUPERADMINISTRADOR, ProfileType.ADMINISTRADOR_DOCUMENTAL)
  createWarehouse(@Body() dto: CreateWarehouseDto) {
    return this.agdCustodyService.createWarehouse(dto);
  }

  @Get('agd-warehouses')
  findAllWarehouses() {
    return this.agdCustodyService.findAllWarehouses();
  }

  @Post('agd-entry-requests')
  createEntryRequest(
    @Body() dto: CreateEntryRequestDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.agdCustodyService.createEntryRequest(user.id, dto);
  }

  @Get('agd-entry-requests/me')
  listMine(@CurrentUser() user: AuthenticatedUser) {
    return this.agdCustodyService.listEntryRequestsForClient(user.id);
  }

  @Get('agd-entry-requests/:id')
  findEntryRequest(@Param('id', ParseUUIDPipe) id: string) {
    return this.agdCustodyService.findEntryRequest(id);
  }

  @Patch('agd-entry-requests/:id/schedule')
  @Roles(...AGD_ROLES)
  scheduleEntry(@Param('id', ParseUUIDPipe) id: string) {
    return this.agdCustodyService.scheduleEntry(id);
  }

  @Post('agd-entry-requests/:id/reception')
  @Roles(...AGD_ROLES)
  startReception(@Param('id', ParseUUIDPipe) id: string) {
    return this.agdCustodyService.startReception(id);
  }

  @Patch('agd-entry-requests/:id/reception/complete')
  @Roles(...AGD_ROLES)
  completeReception(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CompleteReceptionDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.agdCustodyService.completeReception(id, user.id, dto);
  }

  @Post('agd-receptions/:receptionId/lots')
  @Roles(...AGD_ROLES)
  createCustodyLot(
    @Param('receptionId', ParseUUIDPipe) receptionId: string,
    @Body() dto: CreateCustodyLotDto,
  ) {
    return this.agdCustodyService.createCustodyLot(receptionId, dto);
  }

  @Get('agd-custody-lots/:id')
  @Roles(...AGD_ROLES)
  findCustodyLot(@Param('id', ParseUUIDPipe) id: string) {
    return this.agdCustodyService.findCustodyLot(id);
  }

  @Post('agd-custody-lots/:id/movements')
  @Roles(...AGD_ROLES)
  addCustodyMovement(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddCustodyMovementDto,
  ) {
    return this.agdCustodyService.addCustodyMovement(id, dto);
  }

  @Patch('agd-custody-lots/:id/withdraw')
  @Roles(...AGD_ROLES)
  markLotWithdrawn(@Param('id', ParseUUIDPipe) id: string) {
    return this.agdCustodyService.markLotWithdrawn(id);
  }

  @Post('agd-entry-requests/:id/close')
  @Roles(...AGD_ROLES)
  closeOperation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CloseAgdOperationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.agdCustodyService.closeOperation(id, user.id, dto);
  }
}
