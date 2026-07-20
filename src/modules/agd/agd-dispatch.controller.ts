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
import { AgdDispatchService } from './agd-dispatch.service';
import {
  AuthorizeAgdReleaseDto,
  CreateDispatchOrderDto,
  CreatePickingOrderDto,
  RecordDeliveryDto,
} from './dto/dispatch.dto';

const AGD_ROLES = [ProfileType.OPERADOR_AGD, ProfileType.SUPERADMINISTRADOR];

@ApiTags('AGD - Despacho')
@ApiBearerAuth()
@Roles(...AGD_ROLES)
@Controller()
export class AgdDispatchController {
  constructor(private readonly agdDispatchService: AgdDispatchService) {}

  @Post('agd-picking-orders')
  createPickingOrder(
    @Body() dto: CreatePickingOrderDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.agdDispatchService.createPickingOrder(user.id, dto);
  }

  @Patch('agd-picking-orders/:id/complete')
  completePickingOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.agdDispatchService.completePickingOrder(id);
  }

  @Post('agd-dispatch-orders')
  createDispatchOrder(@Body() dto: CreateDispatchOrderDto) {
    return this.agdDispatchService.createDispatchOrder(dto);
  }

  @Patch('agd-dispatch-orders/:id/dispatch')
  dispatch(@Param('id', ParseUUIDPipe) id: string) {
    return this.agdDispatchService.dispatch(id);
  }

  @Post('agd-release-authorizations')
  authorizeRelease(
    @Body() dto: AuthorizeAgdReleaseDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.agdDispatchService.authorizeRelease(user.id, dto);
  }

  @Post('agd-dispatch-orders/:id/delivery')
  recordDelivery(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RecordDeliveryDto,
  ) {
    return this.agdDispatchService.recordDelivery(id, dto);
  }
}
