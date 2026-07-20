import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import {
  AddPromotionConditionDto,
  AddPromotionServiceDto,
} from './dto/promotion-detail.dto';

@ApiTags('Ofertas y promociones')
@ApiBearerAuth()
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) {}

  @Post()
  create(@Body() dto: CreatePromotionDto) {
    return this.promotionsService.create(dto);
  }

  @Public()
  @Get()
  findActive() {
    return this.promotionsService.findActive();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.promotionsService.findOne(id);
  }

  @Post(':id/services')
  addService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddPromotionServiceDto,
  ) {
    return this.promotionsService.addService(id, dto);
  }

  @Post(':id/conditions')
  addCondition(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddPromotionConditionDto,
  ) {
    return this.promotionsService.addCondition(id, dto);
  }

  @Patch(':id/activate')
  activate(@Param('id', ParseUUIDPipe) id: string) {
    return this.promotionsService.activate(id);
  }

  @Patch(':id/pause')
  pause(@Param('id', ParseUUIDPipe) id: string) {
    return this.promotionsService.pause(id);
  }

  @Patch(':id/finish')
  finish(@Param('id', ParseUUIDPipe) id: string) {
    return this.promotionsService.finish(id);
  }

  @Patch(':id/redeem')
  redeem(@Param('id', ParseUUIDPipe) id: string) {
    return this.promotionsService.redeem(id);
  }
}
