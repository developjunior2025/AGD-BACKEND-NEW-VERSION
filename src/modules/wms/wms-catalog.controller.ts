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
import { WmsCatalogService } from './wms-catalog.service';
import {
  CreateLotDto,
  CreateProductDto,
  CreateSerialDto,
  CreateSkuDto,
} from './dto/catalog.dto';
import {
  CreateLocationDto,
  CreateRackDto,
  CreateWarehouseDto,
  CreateZoneDto,
} from './dto/location.dto';

const WMS_ROLES = [ProfileType.OPERADOR_WMS, ProfileType.SUPERADMINISTRADOR];

@ApiTags('WMS - Catálogo')
@ApiBearerAuth()
@Roles(...WMS_ROLES)
@Controller()
export class WmsCatalogController {
  constructor(private readonly wmsCatalogService: WmsCatalogService) {}

  @Post('wms-products')
  createProduct(@Body() dto: CreateProductDto) {
    return this.wmsCatalogService.createProduct(dto);
  }

  @Get('wms-products')
  findAllProducts() {
    return this.wmsCatalogService.findAllProducts();
  }

  @Post('wms-skus')
  createSku(@Body() dto: CreateSkuDto) {
    return this.wmsCatalogService.createSku(dto);
  }

  @Get('wms-skus')
  findAllSkus() {
    return this.wmsCatalogService.findAllSkus();
  }

  @Get('wms-skus/:id')
  findSku(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsCatalogService.findSku(id);
  }

  @Post('wms-lots')
  createLot(@Body() dto: CreateLotDto) {
    return this.wmsCatalogService.createLot(dto);
  }

  @Get('wms-lots')
  findLotsForSku(@Query('skuId', ParseUUIDPipe) skuId: string) {
    return this.wmsCatalogService.findLotsForSku(skuId);
  }

  @Post('wms-serials')
  createSerial(@Body() dto: CreateSerialDto) {
    return this.wmsCatalogService.createSerial(dto);
  }

  @Get('wms-serials')
  findSerialsForSku(@Query('skuId', ParseUUIDPipe) skuId: string) {
    return this.wmsCatalogService.findSerialsForSku(skuId);
  }

  @Post('wms-warehouses')
  createWarehouse(@Body() dto: CreateWarehouseDto) {
    return this.wmsCatalogService.createWarehouse(dto);
  }

  @Get('wms-warehouses')
  findAllWarehouses() {
    return this.wmsCatalogService.findAllWarehouses();
  }

  @Post('wms-warehouses/:warehouseId/zones')
  createZone(
    @Param('warehouseId', ParseUUIDPipe) warehouseId: string,
    @Body() dto: CreateZoneDto,
  ) {
    return this.wmsCatalogService.createZone(warehouseId, dto);
  }

  @Get('wms-warehouses/:warehouseId/zones')
  findZonesForWarehouse(
    @Param('warehouseId', ParseUUIDPipe) warehouseId: string,
  ) {
    return this.wmsCatalogService.findZonesForWarehouse(warehouseId);
  }

  @Post('wms-zones/:zoneId/racks')
  createRack(
    @Param('zoneId', ParseUUIDPipe) zoneId: string,
    @Body() dto: CreateRackDto,
  ) {
    return this.wmsCatalogService.createRack(zoneId, dto);
  }

  @Post('wms-locations')
  createLocation(@Body() dto: CreateLocationDto) {
    return this.wmsCatalogService.createLocation(dto);
  }

  @Get('wms-locations/:id')
  findLocation(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsCatalogService.findLocation(id);
  }

  @Get('wms-zones/:zoneId/locations')
  findLocationsForZone(@Param('zoneId', ParseUUIDPipe) zoneId: string) {
    return this.wmsCatalogService.findLocationsForZone(zoneId);
  }
}
