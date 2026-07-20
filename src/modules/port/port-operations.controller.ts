import {
  Body,
  Controller,
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
import { PortOperationsService } from './port-operations.service';
import {
  AddDischargeEventDto,
  AuthorizeContainerReleaseDto,
  CreateContainerDto,
  CreateDischargeOrderDto,
  MoveContainerDto,
  RegisterGateEventDto,
} from './dto/operations.dto';

const PORT_ROLES = [
  ProfileType.OPERADOR_PORTUARIO,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Puerto - Operaciones')
@ApiBearerAuth()
@Roles(...PORT_ROLES)
@Controller()
export class PortOperationsController {
  constructor(private readonly portOperationsService: PortOperationsService) {}

  @Post('port-containers')
  createContainer(@Body() dto: CreateContainerDto) {
    return this.portOperationsService.createContainer(dto);
  }

  @Post('port-manifests/:manifestId/discharge-orders')
  createDischargeOrder(
    @Param('manifestId', ParseUUIDPipe) manifestId: string,
    @Body() dto: CreateDischargeOrderDto,
  ) {
    return this.portOperationsService.createDischargeOrder(manifestId, dto);
  }

  @Post('port-discharge-orders/:id/events')
  addDischargeEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddDischargeEventDto,
  ) {
    return this.portOperationsService.addDischargeEvent(id, dto);
  }

  @Patch('port-discharge-orders/:id/complete')
  completeDischargeOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.portOperationsService.completeDischargeOrder(id);
  }

  @Post('port-internal-movements')
  moveContainer(@Body() dto: MoveContainerDto) {
    return this.portOperationsService.moveContainer(dto);
  }

  @Post('port-gate-events')
  registerGateEvent(@Body() dto: RegisterGateEventDto) {
    return this.portOperationsService.registerGateEvent(dto);
  }

  @Post('port-release-authorizations')
  authorizeRelease(
    @Body() dto: AuthorizeContainerReleaseDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.portOperationsService.authorizeRelease(user.id, dto);
  }
}
