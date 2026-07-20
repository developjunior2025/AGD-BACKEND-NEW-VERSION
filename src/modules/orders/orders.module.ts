import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogisticsOrder } from './entities/logistics-order.entity';
import { MarketplaceContract } from './entities/marketplace-contract.entity';
import { ContractMilestone } from './entities/contract-milestone.entity';
import { ContractGuarantee } from './entities/contract-guarantee.entity';
import { ProviderQuote } from '../quotes/entities/provider-quote.entity';
import { QuoteRequest } from '../quotes/entities/quote-request.entity';
import { OrdersService } from './orders.service';
import { ContractsService } from './contracts.service';
import { OrdersController } from './orders.controller';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LogisticsOrder,
      MarketplaceContract,
      ContractMilestone,
      ContractGuarantee,
      ProviderQuote,
      QuoteRequest,
    ]),
  ],
  controllers: [OrdersController, ContractsController],
  providers: [OrdersService, ContractsService],
  exports: [OrdersService, ContractsService],
})
export class OrdersModule {}
