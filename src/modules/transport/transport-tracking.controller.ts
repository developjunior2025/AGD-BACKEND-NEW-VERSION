import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import { TransportTrackingService } from './transport-tracking.service';
import { CreateGeofenceDto, RecordGpsPingDto } from './dto/tracking.dto';

const TRANSPORT_ROLES = [
  ProfileType.TRANSPORTISTA,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Transporte - Tracking')
@ApiBearerAuth()
@Controller()
export class TransportTrackingController {
  constructor(
    private readonly transportTrackingService: TransportTrackingService,
  ) {}

  @Post('transport-trips/:id/gps-pings')
  @Roles(...TRANSPORT_ROLES)
  recordPing(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RecordGpsPingDto,
  ) {
    return this.transportTrackingService.recordPing(id, dto);
  }

  @Get('transport-trips/:id/gps-pings')
  listPingsForTrip(@Param('id', ParseUUIDPipe) id: string) {
    return this.transportTrackingService.listPingsForTrip(id);
  }

  @Post('transport-geofences')
  @Roles(...TRANSPORT_ROLES)
  createGeofence(@Body() dto: CreateGeofenceDto) {
    return this.transportTrackingService.createGeofence(dto);
  }

  @Get('transport-geofences')
  findAllGeofences() {
    return this.transportTrackingService.findAllGeofences();
  }
}
