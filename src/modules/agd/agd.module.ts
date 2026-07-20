import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgdWarehouse } from './entities/agd-warehouse.entity';
import { AgdEntryRequest } from './entities/agd-entry-request.entity';
import { AgdReception } from './entities/agd-reception.entity';
import { AgdCustodyLot } from './entities/agd-custody-lot.entity';
import { AgdCustodyMovement } from './entities/agd-custody-movement.entity';
import { AgdOperationClosure } from './entities/agd-operation-closure.entity';
import { AgdDepositCertificate } from './entities/agd-deposit-certificate.entity';
import { AgdPledgeBond } from './entities/agd-pledge-bond.entity';
import { AgdTitleEndorsement } from './entities/agd-title-endorsement.entity';
import { AgdTitleValidity } from './entities/agd-title-validity.entity';
import { AgdPickingOrder } from './entities/agd-picking-order.entity';
import { AgdDispatchOrder } from './entities/agd-dispatch-order.entity';
import { AgdReleaseAuthorization } from './entities/agd-release-authorization.entity';
import { AgdDeliveryRecord } from './entities/agd-delivery-record.entity';
import { AgdCustodyService } from './agd-custody.service';
import { AgdTitlesService } from './agd-titles.service';
import { AgdDispatchService } from './agd-dispatch.service';
import { AgdCustodyController } from './agd-custody.controller';
import { AgdTitlesController } from './agd-titles.controller';
import { AgdDispatchController } from './agd-dispatch.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AgdWarehouse,
      AgdEntryRequest,
      AgdReception,
      AgdCustodyLot,
      AgdCustodyMovement,
      AgdOperationClosure,
      AgdDepositCertificate,
      AgdPledgeBond,
      AgdTitleEndorsement,
      AgdTitleValidity,
      AgdPickingOrder,
      AgdDispatchOrder,
      AgdReleaseAuthorization,
      AgdDeliveryRecord,
    ]),
  ],
  controllers: [
    AgdCustodyController,
    AgdTitlesController,
    AgdDispatchController,
  ],
  providers: [AgdCustodyService, AgdTitlesService, AgdDispatchService],
  exports: [AgdCustodyService, AgdTitlesService, AgdDispatchService],
})
export class AgdModule {}
