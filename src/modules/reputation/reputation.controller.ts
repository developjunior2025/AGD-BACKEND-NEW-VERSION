import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { ReputationService } from './reputation.service';
import { AddFavoriteDto } from './dto/add-favorite.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('Reputación')
@ApiBearerAuth()
@Controller()
export class ReputationController {
  constructor(private readonly reputationService: ReputationService) {}

  @Post('favorites')
  addFavorite(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: AddFavoriteDto,
  ) {
    return this.reputationService.addFavorite(user.id, dto);
  }

  @Get('favorites/me')
  listFavorites(@CurrentUser() user: AuthenticatedUser) {
    return this.reputationService.listFavorites(user.id);
  }

  @Delete('favorites/:id')
  removeFavorite(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reputationService.removeFavorite(user.id, id);
  }

  @Post('reviews')
  createReview(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reputationService.createReview(user.id, dto);
  }

  @Public()
  @Get('providers/:providerProfileId/reviews')
  listReviews(
    @Param('providerProfileId', ParseUUIDPipe) providerProfileId: string,
  ) {
    return this.reputationService.listReviewsForProvider(providerProfileId);
  }

  @Public()
  @Get('providers/:providerProfileId/reputation')
  getReputation(
    @Param('providerProfileId', ParseUUIDPipe) providerProfileId: string,
  ) {
    return this.reputationService.getReputation(providerProfileId);
  }
}
