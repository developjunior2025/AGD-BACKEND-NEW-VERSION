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
import { TransportTripsService } from './transport-trips.service';
import { CreateTransportOrderDto } from './dto/order.dto';
import {
  AddRouteStopDto,
  AddTripMilestoneDto,
  AssignTripDto,
  CreateRouteDto,
} from './dto/trip.dto';

const TRANSPORT_ROLES = [
  ProfileType.TRANSPORTISTA,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Transporte - Órdenes y viajes')
@ApiBearerAuth()
@Controller()
export class TransportTripsController {
  constructor(private readonly transportTripsService: TransportTripsService) {}

  @Post('transport-orders')
  createOrder(
    @Body() dto: CreateTransportOrderDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.transportTripsService.createOrder(user.id, dto);
  }

  @Get('transport-orders/me')
  listMine(@CurrentUser() user: AuthenticatedUser) {
    return this.transportTripsService.listOrdersForClient(user.id);
  }

  @Get('transport-orders/:id')
  findOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportTripsService.findOrder(id);
  }

  @Post('transport-orders/:id/trips')
  @Roles(...TRANSPORT_ROLES)
  createTrip(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportTripsService.createTrip(id);
  }

  @Get('transport-trips/:id')
  findTrip(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportTripsService.findTrip(id);
  }

  @Patch('transport-trips/:id/assign')
  @Roles(...TRANSPORT_ROLES)
  assignTrip(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignTripDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.transportTripsService.assignTrip(id, user.id, dto);
  }

  @Patch('transport-trips/:id/start')
  @Roles(...TRANSPORT_ROLES)
  startTrip(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportTripsService.startTrip(id);
  }

  @Patch('transport-trips/:id/end')
  @Roles(...TRANSPORT_ROLES)
  endTrip(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportTripsService.endTrip(id);
  }

  @Post('transport-trips/:id/route')
  @Roles(...TRANSPORT_ROLES)
  createRoute(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateRouteDto,
  ) {
    return this.transportTripsService.createRoute(id, dto);
  }

  @Post('transport-routes/:routeId/stops')
  @Roles(...TRANSPORT_ROLES)
  addRouteStop(
    @Param('routeId', ParseUUIDPipe) routeId: string,
    @Body() dto: AddRouteStopDto,
  ) {
    return this.transportTripsService.addRouteStop(routeId, dto);
  }

  @Patch('transport-route-stops/:id/complete')
  @Roles(...TRANSPORT_ROLES)
  completeRouteStop(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportTripsService.completeRouteStop(id);
  }

  @Post('transport-trips/:id/milestones')
  @Roles(...TRANSPORT_ROLES)
  addMilestone(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddTripMilestoneDto,
  ) {
    return this.transportTripsService.addMilestone(id, dto);
  }

  @Patch('transport-milestones/:id/complete')
  @Roles(...TRANSPORT_ROLES)
  completeMilestone(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportTripsService.completeMilestone(id);
  }
}
