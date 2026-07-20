import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import { CustomsCatalogService } from './customs-catalog.service';
import {
  CreateBrokerAuthorizationDto,
  CreateRegimeDto,
  CreateTariffClassificationDto,
} from './dto/catalog.dto';

@ApiTags('Aduanas - Catálogo')
@ApiBearerAuth()
@Roles(ProfileType.SUPERADMINISTRADOR, ProfileType.ADMINISTRADOR_DOCUMENTAL)
@Controller()
export class CustomsCatalogController {
  constructor(private readonly customsCatalogService: CustomsCatalogService) {}

  @Post('customs-regimes')
  createRegime(@Body() dto: CreateRegimeDto) {
    return this.customsCatalogService.createRegime(dto);
  }

  @Get('customs-regimes')
  findAllRegimes() {
    return this.customsCatalogService.findAllRegimes();
  }

  @Post('customs-tariff-classifications')
  createTariffClassification(@Body() dto: CreateTariffClassificationDto) {
    return this.customsCatalogService.createTariffClassification(dto);
  }

  @Get('customs-tariff-classifications')
  findAllTariffClassifications() {
    return this.customsCatalogService.findAllTariffClassifications();
  }

  @Get('customs-tariff-classifications/:id')
  findTariffClassification(@Param('id', ParseUUIDPipe) id: string) {
    return this.customsCatalogService.findTariffClassification(id);
  }

  @Post('customs-broker-authorizations')
  createBrokerAuthorization(@Body() dto: CreateBrokerAuthorizationDto) {
    return this.customsCatalogService.createBrokerAuthorization(dto);
  }

  @Get('customs-broker-authorizations')
  findBrokerAuthorizations(@Query('brokerId', ParseUUIDPipe) brokerId: string) {
    return this.customsCatalogService.findBrokerAuthorizations(brokerId);
  }
}
