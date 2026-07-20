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
import { LogisticsServicesService } from './logistics-services.service';
import { CreateLogisticsServiceDto } from './dto/create-logistics-service.dto';
import { AddRelatedServiceDto } from './dto/add-related-service.dto';
import {
  AddServiceDeliverableDto,
  AddServicePackageDto,
  AddServicePricingDto,
  AddServiceRequirementDto,
  SetServiceAvailabilityDto,
  SetServiceScopeDto,
} from './dto/service-detail.dto';

@ApiTags('Catálogo - Servicios')
@ApiBearerAuth()
@Controller('services')
export class LogisticsServicesController {
  constructor(private readonly servicesService: LogisticsServicesService) {}

  @Post()
  create(@Body() dto: CreateLogisticsServiceDto) {
    return this.servicesService.create(dto);
  }

  @Public()
  @Get()
  search(
    @Query('categoryId') categoryId?: string,
    @Query('subcategoryId') subcategoryId?: string,
    @Query('providerProfileId') providerProfileId?: string,
    @Query('search') search?: string,
    @Query('ids') ids?: string,
  ) {
    return this.servicesService.search({
      categoryId,
      subcategoryId,
      providerProfileId,
      search,
      ids: ids ? ids.split(',').filter(Boolean) : undefined,
    });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id/publish')
  publish(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicesService.publish(id);
  }

  @Patch(':id/pause')
  pause(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicesService.pause(id);
  }

  @Patch(':id/archive')
  archive(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicesService.archive(id);
  }

  @Post(':id/scope')
  setScope(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SetServiceScopeDto,
  ) {
    return this.servicesService.setScope(id, dto);
  }

  @Post(':id/requirements')
  addRequirement(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddServiceRequirementDto,
  ) {
    return this.servicesService.addRequirement(id, dto);
  }

  @Post(':id/deliverables')
  addDeliverable(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddServiceDeliverableDto,
  ) {
    return this.servicesService.addDeliverable(id, dto);
  }

  @Post(':id/pricing')
  addPricing(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddServicePricingDto,
  ) {
    return this.servicesService.addPricing(id, dto);
  }

  @Post(':id/packages')
  addPackage(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddServicePackageDto,
  ) {
    return this.servicesService.addPackage(id, dto);
  }

  @Post(':id/availability')
  setAvailability(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SetServiceAvailabilityDto,
  ) {
    return this.servicesService.setAvailability(id, dto);
  }

  @Post(':id/related')
  addRelatedService(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddRelatedServiceDto,
  ) {
    return this.servicesService.addRelatedService(id, dto.relatedServiceId);
  }
}
