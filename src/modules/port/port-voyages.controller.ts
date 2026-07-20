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
import { PortVoyagesService } from './port-voyages.service';
import {
  AssignBerthDto,
  CloseOperationDto,
  CreateOperatingWindowDto,
  CreateVoyageDto,
  RequestArrivalDto,
  RequestBerthDto,
} from './dto/voyage.dto';

const PORT_ROLES = [
  ProfileType.OPERADOR_PORTUARIO,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Puerto - Escala')
@ApiBearerAuth()
@Roles(...PORT_ROLES)
@Controller('port-voyages')
export class PortVoyagesController {
  constructor(private readonly portVoyagesService: PortVoyagesService) {}

  @Post()
  create(@Body() dto: CreateVoyageDto) {
    return this.portVoyagesService.create(dto);
  }

  @Get()
  findAll() {
    return this.portVoyagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.portVoyagesService.findOne(id);
  }

  @Post(':id/arrival')
  requestArrival(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RequestArrivalDto,
  ) {
    return this.portVoyagesService.requestArrival(id, dto);
  }

  @Patch(':id/arrival/confirm')
  confirmArrival(@Param('id', ParseUUIDPipe) id: string) {
    return this.portVoyagesService.confirmArrival(id);
  }

  @Patch(':id/arrival/register')
  registerActualArrival(@Param('id', ParseUUIDPipe) id: string) {
    return this.portVoyagesService.registerActualArrival(id);
  }

  @Post(':id/berth-request')
  requestBerth(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RequestBerthDto,
  ) {
    return this.portVoyagesService.requestBerth(id, dto);
  }

  @Post(':id/berth-assignment')
  assignBerth(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignBerthDto,
  ) {
    return this.portVoyagesService.assignBerth(id, dto);
  }

  @Post('berth-assignments/:berthAssignmentId/windows')
  addOperatingWindow(
    @Param('berthAssignmentId', ParseUUIDPipe) berthAssignmentId: string,
    @Body() dto: CreateOperatingWindowDto,
  ) {
    return this.portVoyagesService.addOperatingWindow(berthAssignmentId, dto);
  }

  @Patch('operating-windows/:windowId/start')
  startOperatingWindow(@Param('windowId', ParseUUIDPipe) windowId: string) {
    return this.portVoyagesService.startOperatingWindow(windowId);
  }

  @Patch('operating-windows/:windowId/finish')
  finishOperatingWindow(@Param('windowId', ParseUUIDPipe) windowId: string) {
    return this.portVoyagesService.finishOperatingWindow(windowId);
  }

  @Post(':id/close')
  closeOperation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CloseOperationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.portVoyagesService.closeOperation(id, user.id, dto);
  }
}
