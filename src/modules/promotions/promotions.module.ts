import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { PromotionService } from './entities/promotion-service.entity';
import { PromotionCondition } from './entities/promotion-condition.entity';
import { PromotionsService } from './promotions.service';
import { PromotionsController } from './promotions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promotion, PromotionService, PromotionCondition]),
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService],
  exports: [PromotionsService],
})
export class PromotionsModule {}
