import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategory } from './entities/service-category.entity';
import { ServiceSubcategory } from './entities/service-subcategory.entity';
import { LogisticsService } from './entities/logistics-service.entity';
import { ServiceScope } from './entities/service-scope.entity';
import { ServiceRequirement } from './entities/service-requirement.entity';
import { ServiceDeliverable } from './entities/service-deliverable.entity';
import { ServicePricing } from './entities/service-pricing.entity';
import { ServicePackage } from './entities/service-package.entity';
import { ServiceAvailability } from './entities/service-availability.entity';
import { ServiceRelatedItem } from './entities/service-related-item.entity';
import { ServiceCategoriesService } from './service-categories.service';
import { LogisticsServicesService } from './logistics-services.service';
import { ServiceCategoriesController } from './service-categories.controller';
import { LogisticsServicesController } from './logistics-services.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceCategory,
      ServiceSubcategory,
      LogisticsService,
      ServiceScope,
      ServiceRequirement,
      ServiceDeliverable,
      ServicePricing,
      ServicePackage,
      ServiceAvailability,
      ServiceRelatedItem,
    ]),
  ],
  controllers: [ServiceCategoriesController, LogisticsServicesController],
  providers: [ServiceCategoriesService, LogisticsServicesService],
  exports: [ServiceCategoriesService, LogisticsServicesService],
})
export class CatalogModule {}
