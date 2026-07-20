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
import { TransportDocumentsService } from './transport-documents.service';
import {
  AddIncidentDto,
  AddTripExpenseDto,
  CloseTripDto,
  CreateDeliveryNoteDto,
  CreateWaybillDto,
  RecordPodDto,
} from './dto/documents.dto';

const TRANSPORT_ROLES = [
  ProfileType.TRANSPORTISTA,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Transporte - Documentos')
@ApiBearerAuth()
@Roles(...TRANSPORT_ROLES)
@Controller('transport-trips/:tripId')
export class TransportDocumentsController {
  constructor(
    private readonly transportDocumentsService: TransportDocumentsService,
  ) {}

  @Post('waybill')
  createWaybill(
    @Param('tripId', ParseUUIDPipe) tripId: string,
    @Body() dto: CreateWaybillDto,
  ) {
    return this.transportDocumentsService.createWaybill(tripId, dto);
  }

  @Post('delivery-note')
  createDeliveryNote(
    @Param('tripId', ParseUUIDPipe) tripId: string,
    @Body() dto: CreateDeliveryNoteDto,
  ) {
    return this.transportDocumentsService.createDeliveryNote(tripId, dto);
  }

  @Post('incidents')
  addIncident(
    @Param('tripId', ParseUUIDPipe) tripId: string,
    @Body() dto: AddIncidentDto,
  ) {
    return this.transportDocumentsService.addIncident(tripId, dto);
  }

  @Post('proof-of-delivery')
  recordProofOfDelivery(
    @Param('tripId', ParseUUIDPipe) tripId: string,
    @Body() dto: RecordPodDto,
  ) {
    return this.transportDocumentsService.recordProofOfDelivery(tripId, dto);
  }

  @Post('expenses')
  addExpense(
    @Param('tripId', ParseUUIDPipe) tripId: string,
    @Body() dto: AddTripExpenseDto,
  ) {
    return this.transportDocumentsService.addExpense(tripId, dto);
  }

  @Patch('settle')
  settleTrip(@Param('tripId', ParseUUIDPipe) tripId: string) {
    return this.transportDocumentsService.settleTrip(tripId);
  }

  @Patch('close')
  closeTrip(
    @Param('tripId', ParseUUIDPipe) tripId: string,
    @Body() dto: CloseTripDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.transportDocumentsService.closeTrip(tripId, user.id, dto);
  }
}
