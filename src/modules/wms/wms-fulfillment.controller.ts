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
import { WmsFulfillmentService } from './wms-fulfillment.service';
import {
  AddDispatchEvidenceDto,
  CreateDispatchOrderDto,
  CreatePackingOrderDto,
  CreatePickingOrderDto,
  CreateTaskDto,
} from './dto/fulfillment.dto';

const WMS_ROLES = [ProfileType.OPERADOR_WMS, ProfileType.SUPERADMINISTRADOR];

@ApiTags('WMS - Cumplimiento')
@ApiBearerAuth()
@Roles(...WMS_ROLES)
@Controller()
export class WmsFulfillmentController {
  constructor(private readonly wmsFulfillmentService: WmsFulfillmentService) {}

  @Post('wms-picking-orders')
  createPickingOrder(
    @Body() dto: CreatePickingOrderDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.wmsFulfillmentService.createPickingOrder(user.id, dto);
  }

  @Patch('wms-picking-orders/:id/complete')
  completePickingOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsFulfillmentService.completePickingOrder(id);
  }

  @Post('wms-packing-orders')
  createPackingOrder(@Body() dto: CreatePackingOrderDto) {
    return this.wmsFulfillmentService.createPackingOrder(dto);
  }

  @Patch('wms-packing-orders/:id/complete')
  completePackingOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.wmsFulfillmentService.completePackingOrder(id, user.id);
  }

  @Post('wms-dispatch-orders')
  createDispatchOrder(@Body() dto: CreateDispatchOrderDto) {
    return this.wmsFulfillmentService.createDispatchOrder(dto);
  }

  @Get('wms-dispatch-orders/:id')
  findDispatchOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsFulfillmentService.findDispatchOrder(id);
  }

  @Patch('wms-dispatch-orders/:id/checklist')
  completeDispatchChecklist(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsFulfillmentService.completeDispatchChecklist(id);
  }

  @Patch('wms-dispatch-orders/:id/dispatch')
  dispatch(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsFulfillmentService.dispatch(id);
  }

  @Post('wms-dispatch-orders/:id/evidence')
  addDispatchEvidence(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddDispatchEvidenceDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.wmsFulfillmentService.addDispatchEvidence(id, user.id, dto);
  }

  @Post('wms-tasks')
  createTask(@Body() dto: CreateTaskDto) {
    return this.wmsFulfillmentService.createTask(dto);
  }

  @Get('wms-tasks/me')
  listMyTasks(@CurrentUser() user: AuthenticatedUser) {
    return this.wmsFulfillmentService.listTasksForAssignee(user.id);
  }

  @Patch('wms-tasks/:id/complete')
  completeTask(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsFulfillmentService.completeTask(id);
  }
}
