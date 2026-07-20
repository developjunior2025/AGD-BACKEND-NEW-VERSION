import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Review } from './entities/review.entity';
import { Rating } from './entities/rating.entity';
import { ProviderReputation } from './entities/provider-reputation.entity';
import { ProviderProfile } from '../providers/entities/provider-profile.entity';
import { ReputationService } from './reputation.service';
import { ReputationController } from './reputation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Favorite,
      Review,
      Rating,
      ProviderReputation,
      ProviderProfile,
    ]),
  ],
  controllers: [ReputationController],
  providers: [ReputationService],
  exports: [ReputationService],
})
export class ReputationModule {}
