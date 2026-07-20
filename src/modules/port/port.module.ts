import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortVessel } from './entities/port-vessel.entity';
import { PortEquipment } from './entities/port-equipment.entity';
import { PortYard } from './entities/port-yard.entity';
import { PortYardSlot } from './entities/port-yard-slot.entity';
import { PortVoyage } from './entities/port-voyage.entity';
import { PortArrival } from './entities/port-arrival.entity';
import { PortBerthRequest } from './entities/port-berth-request.entity';
import { PortBerthAssignment } from './entities/port-berth-assignment.entity';
import { PortOperatingWindow } from './entities/port-operating-window.entity';
import { PortOperationClosure } from './entities/port-operation-closure.entity';
import { PortManifest } from './entities/port-manifest.entity';
import { PortManifestItem } from './entities/port-manifest-item.entity';
import { PortManifestReconciliation } from './entities/port-manifest-reconciliation.entity';
import { PortDiscrepancy } from './entities/port-discrepancy.entity';
import { PortContainer } from './entities/port-container.entity';
import { PortDischargeOrder } from './entities/port-discharge-order.entity';
import { PortDischargeEvent } from './entities/port-discharge-event.entity';
import { PortInternalMovement } from './entities/port-internal-movement.entity';
import { PortGateEvent } from './entities/port-gate-event.entity';
import { PortReleaseAuthorization } from './entities/port-release-authorization.entity';
import { PortCatalogService } from './port-catalog.service';
import { PortVoyagesService } from './port-voyages.service';
import { PortManifestsService } from './port-manifests.service';
import { PortOperationsService } from './port-operations.service';
import { PortCatalogController } from './port-catalog.controller';
import { PortVoyagesController } from './port-voyages.controller';
import { PortManifestsController } from './port-manifests.controller';
import { PortOperationsController } from './port-operations.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PortVessel,
      PortEquipment,
      PortYard,
      PortYardSlot,
      PortVoyage,
      PortArrival,
      PortBerthRequest,
      PortBerthAssignment,
      PortOperatingWindow,
      PortOperationClosure,
      PortManifest,
      PortManifestItem,
      PortManifestReconciliation,
      PortDiscrepancy,
      PortContainer,
      PortDischargeOrder,
      PortDischargeEvent,
      PortInternalMovement,
      PortGateEvent,
      PortReleaseAuthorization,
    ]),
  ],
  controllers: [
    PortCatalogController,
    PortVoyagesController,
    PortManifestsController,
    PortOperationsController,
  ],
  providers: [
    PortCatalogService,
    PortVoyagesService,
    PortManifestsService,
    PortOperationsService,
  ],
  exports: [
    PortCatalogService,
    PortVoyagesService,
    PortManifestsService,
    PortOperationsService,
  ],
})
export class PortModule {}
