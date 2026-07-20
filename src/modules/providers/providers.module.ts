import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderProfile } from './entities/provider-profile.entity';
import { ProviderCategory } from './entities/provider-category.entity';
import { ProviderSpecialty } from './entities/provider-specialty.entity';
import { ProviderServiceArea } from './entities/provider-service-area.entity';
import { ProviderCertification } from './entities/provider-certification.entity';
import { ProviderLicense } from './entities/provider-license.entity';
import { ProviderInsurance } from './entities/provider-insurance.entity';
import { ProviderVerification } from './entities/provider-verification.entity';
import { ProviderAvailability } from './entities/provider-availability.entity';
import { ProviderPortfolio } from './entities/provider-portfolio.entity';
import { ProviderPortfolioItem } from './entities/provider-portfolio-item.entity';
import { ProviderStatusHistory } from './entities/provider-status-history.entity';
import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProviderProfile,
      ProviderCategory,
      ProviderSpecialty,
      ProviderServiceArea,
      ProviderCertification,
      ProviderLicense,
      ProviderInsurance,
      ProviderVerification,
      ProviderAvailability,
      ProviderPortfolio,
      ProviderPortfolioItem,
      ProviderStatusHistory,
    ]),
  ],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
