import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomsRegime } from './entities/customs-regime.entity';
import { CustomsTariffClassification } from './entities/customs-tariff-classification.entity';
import { CustomsBrokerAuthorization } from './entities/customs-broker-authorization.entity';
import { CustomsDeclaration } from './entities/customs-declaration.entity';
import { CustomsDeclarationItem } from './entities/customs-declaration-item.entity';
import { CustomsStatusHistory } from './entities/customs-status-history.entity';
import { CustomsRequirement } from './entities/customs-requirement.entity';
import { CustomsObservation } from './entities/customs-observation.entity';
import { CustomsValuation } from './entities/customs-valuation.entity';
import { CustomsTaxSettlement } from './entities/customs-tax-settlement.entity';
import { CustomsTaxItem } from './entities/customs-tax-item.entity';
import { CustomsSelectivityChannel } from './entities/customs-selectivity-channel.entity';
import { CustomsRiskProfile } from './entities/customs-risk-profile.entity';
import { CustomsInspection } from './entities/customs-inspection.entity';
import { CustomsInspectionResult } from './entities/customs-inspection-result.entity';
import { CustomsReleaseAuthorization } from './entities/customs-release-authorization.entity';
import { CustomsCatalogService } from './customs-catalog.service';
import { CustomsDeclarationsService } from './customs-declarations.service';
import { CustomsProcessingService } from './customs-processing.service';
import { CustomsCatalogController } from './customs-catalog.controller';
import { CustomsDeclarationsController } from './customs-declarations.controller';
import {
  CustomsInspectionsController,
  CustomsProcessingController,
  CustomsRiskProfilesController,
} from './customs-processing.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomsRegime,
      CustomsTariffClassification,
      CustomsBrokerAuthorization,
      CustomsDeclaration,
      CustomsDeclarationItem,
      CustomsStatusHistory,
      CustomsRequirement,
      CustomsObservation,
      CustomsValuation,
      CustomsTaxSettlement,
      CustomsTaxItem,
      CustomsSelectivityChannel,
      CustomsRiskProfile,
      CustomsInspection,
      CustomsInspectionResult,
      CustomsReleaseAuthorization,
    ]),
  ],
  controllers: [
    CustomsCatalogController,
    CustomsDeclarationsController,
    CustomsProcessingController,
    CustomsRiskProfilesController,
    CustomsInspectionsController,
  ],
  providers: [
    CustomsCatalogService,
    CustomsDeclarationsService,
    CustomsProcessingService,
  ],
  exports: [
    CustomsCatalogService,
    CustomsDeclarationsService,
    CustomsProcessingService,
  ],
})
export class CustomsModule {}
