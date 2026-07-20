import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportCompany } from './entities/transport-company.entity';
import { TransportVehicle } from './entities/transport-vehicle.entity';
import { TransportDriver } from './entities/transport-driver.entity';
import { TransportDriverCredential } from './entities/transport-driver-credential.entity';
import { TransportVehicleDocument } from './entities/transport-vehicle-document.entity';
import { TransportOrder } from './entities/transport-order.entity';
import { TransportTrip } from './entities/transport-trip.entity';
import { TransportTripAssignment } from './entities/transport-trip-assignment.entity';
import { TransportRoute } from './entities/transport-route.entity';
import { TransportRouteStop } from './entities/transport-route-stop.entity';
import { TransportGpsPing } from './entities/transport-gps-ping.entity';
import { TransportGeofence } from './entities/transport-geofence.entity';
import { TransportMilestone } from './entities/transport-milestone.entity';
import { TransportWaybill } from './entities/transport-waybill.entity';
import { TransportDeliveryNote } from './entities/transport-delivery-note.entity';
import { TransportIncident } from './entities/transport-incident.entity';
import { TransportProofOfDelivery } from './entities/transport-proof-of-delivery.entity';
import { TransportTripExpense } from './entities/transport-trip-expense.entity';
import { TransportTripSettlement } from './entities/transport-trip-settlement.entity';
import { TransportOperationClosure } from './entities/transport-operation-closure.entity';
import { TransportFleetService } from './transport-fleet.service';
import { TransportTripsService } from './transport-trips.service';
import { TransportTrackingService } from './transport-tracking.service';
import { TransportDocumentsService } from './transport-documents.service';
import { TransportTrackingGateway } from './transport-tracking.gateway';
import { TransportFleetController } from './transport-fleet.controller';
import { TransportTripsController } from './transport-trips.controller';
import { TransportTrackingController } from './transport-tracking.controller';
import { TransportDocumentsController } from './transport-documents.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransportCompany,
      TransportVehicle,
      TransportDriver,
      TransportDriverCredential,
      TransportVehicleDocument,
      TransportOrder,
      TransportTrip,
      TransportTripAssignment,
      TransportRoute,
      TransportRouteStop,
      TransportGpsPing,
      TransportGeofence,
      TransportMilestone,
      TransportWaybill,
      TransportDeliveryNote,
      TransportIncident,
      TransportProofOfDelivery,
      TransportTripExpense,
      TransportTripSettlement,
      TransportOperationClosure,
    ]),
    JwtModule.register({}),
  ],
  controllers: [
    TransportFleetController,
    TransportTripsController,
    TransportTrackingController,
    TransportDocumentsController,
  ],
  providers: [
    TransportFleetService,
    TransportTripsService,
    TransportTrackingService,
    TransportDocumentsService,
    TransportTrackingGateway,
  ],
  exports: [
    TransportFleetService,
    TransportTripsService,
    TransportTrackingService,
    TransportDocumentsService,
  ],
})
export class TransportModule {}
