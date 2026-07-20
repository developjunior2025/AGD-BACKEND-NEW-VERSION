import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { ProvidersService } from './providers.service';
import { RegisterProviderDto } from './dto/register-provider.dto';
import {
  AddProviderCategoryDto,
  AddProviderServiceAreaDto,
  AddProviderSpecialtyDto,
} from './dto/provider-catalog.dto';
import {
  AddProviderCertificationDto,
  AddProviderInsuranceDto,
  AddProviderLicenseDto,
} from './dto/provider-credentials.dto';
import {
  AddProviderPortfolioDto,
  AddProviderPortfolioItemDto,
} from './dto/provider-portfolio.dto';

const GOVERNANCE_ROLES = [
  ProfileType.SUPERADMINISTRADOR,
  ProfileType.ADMINISTRADOR_DOCUMENTAL,
];

@ApiTags('Proveedores')
@ApiBearerAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  register(@Body() dto: RegisterProviderDto) {
    return this.providersService.register(dto);
  }

  @Public()
  @Get()
  findAll(
    @Query('categoryCode') categoryCode?: string,
    @Query('country') country?: string,
  ) {
    return this.providersService.findAll({ categoryCode, country });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.findOne(id);
  }

  @Post(':id/categories')
  addCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddProviderCategoryDto,
  ) {
    return this.providersService.addCategory(id, dto);
  }

  @Post(':id/specialties')
  addSpecialty(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddProviderSpecialtyDto,
  ) {
    return this.providersService.addSpecialty(id, dto);
  }

  @Post(':id/service-areas')
  addServiceArea(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddProviderServiceAreaDto,
  ) {
    return this.providersService.addServiceArea(id, dto);
  }

  @Post(':id/certifications')
  addCertification(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddProviderCertificationDto,
  ) {
    return this.providersService.addCertification(id, dto);
  }

  @Post(':id/licenses')
  addLicense(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddProviderLicenseDto,
  ) {
    return this.providersService.addLicense(id, dto);
  }

  @Post(':id/insurances')
  addInsurance(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddProviderInsuranceDto,
  ) {
    return this.providersService.addInsurance(id, dto);
  }

  @Post(':id/portfolios')
  addPortfolio(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddProviderPortfolioDto,
  ) {
    return this.providersService.addPortfolio(id, dto);
  }

  @Post('portfolios/:portfolioId/items')
  addPortfolioItem(
    @Param('portfolioId', ParseUUIDPipe) portfolioId: string,
    @Body() dto: AddProviderPortfolioItemDto,
  ) {
    return this.providersService.addPortfolioItem(portfolioId, dto);
  }

  @Patch(':id/verify')
  @Roles(...GOVERNANCE_ROLES)
  verify(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.providersService.verify(id, user.id);
  }

  @Patch(':id/activate')
  @Roles(...GOVERNANCE_ROLES)
  activate(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.providersService.activate(id, user.id);
  }
}
