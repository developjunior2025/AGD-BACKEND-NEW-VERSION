import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { Review } from './entities/review.entity';
import { Rating } from './entities/rating.entity';
import { ProviderReputation } from './entities/provider-reputation.entity';
import { ProviderProfile } from '../providers/entities/provider-profile.entity';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReputationService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(ProviderReputation)
    private readonly reputationRepository: Repository<ProviderReputation>,
    @InjectRepository(ProviderProfile)
    private readonly providerRepository: Repository<ProviderProfile>,
  ) {}

  async addFavorite(userId: string, dto: AddFavoriteDto): Promise<Favorite> {
    if (!dto.providerProfileId && !dto.logisticsServiceId) {
      throw new BadRequestException(
        'Debe indicar providerProfileId o logisticsServiceId para marcar como favorito.',
      );
    }
    if (dto.providerProfileId && dto.logisticsServiceId) {
      throw new BadRequestException(
        'Solo puede marcar un elemento como favorito a la vez.',
      );
    }

    return this.favoriteRepository.save(
      this.favoriteRepository.create({ ...dto, userId }),
    );
  }

  async removeFavorite(userId: string, favoriteId: string): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({
      where: { id: favoriteId, userId },
    });
    if (!favorite) {
      throw new NotFoundException(`Favorito ${favoriteId} no encontrado.`);
    }
    await this.favoriteRepository.softRemove(favorite);
  }

  listFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  /** Regla §10: valoraciones solo tras operación válida y cerrada; verificada si hay orden asociada. */
  async createReview(authorId: string, dto: CreateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.save(
      this.reviewRepository.create({
        authorId,
        providerProfileId: dto.providerProfileId,
        comment: dto.comment,
        relatedOrderId: dto.relatedOrderId ?? null,
        isVerified: Boolean(dto.relatedOrderId),
      }),
    );

    await this.ratingRepository.save(
      dto.ratings.map((rating) =>
        this.ratingRepository.create({ ...rating, reviewId: review.id }),
      ),
    );

    await this.recalculateReputation(dto.providerProfileId);

    return review;
  }

  listReviewsForProvider(providerProfileId: string): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { providerProfileId },
      relations: { ratings: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getReputation(providerProfileId: string): Promise<ProviderReputation> {
    const reputation = await this.reputationRepository.findOne({
      where: { providerProfileId },
    });
    if (!reputation) {
      throw new NotFoundException(
        `Sin reputación registrada para ${providerProfileId}.`,
      );
    }
    return reputation;
  }

  private async recalculateReputation(
    providerProfileId: string,
  ): Promise<void> {
    const reviews = await this.reviewRepository.find({
      where: { providerProfileId },
      relations: { ratings: true },
    });

    const allScores = reviews.flatMap((review) =>
      review.ratings.map((rating) => rating.score),
    );
    const averageScore = allScores.length
      ? allScores.reduce((sum, score) => sum + score, 0) / allScores.length
      : 0;

    let reputation = await this.reputationRepository.findOne({
      where: { providerProfileId },
    });
    if (!reputation) {
      reputation = this.reputationRepository.create({ providerProfileId });
    }
    reputation.averageScore = averageScore.toFixed(2);
    reputation.totalReviews = reviews.length;
    reputation.recalculatedAt = new Date();
    await this.reputationRepository.save(reputation);

    await this.providerRepository.update(
      { id: providerProfileId },
      { ratingAverage: averageScore.toFixed(2), ratingCount: reviews.length },
    );
  }
}
