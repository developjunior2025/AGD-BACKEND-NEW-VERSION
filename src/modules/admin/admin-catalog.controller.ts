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
import { AdminCatalogService } from './admin-catalog.service';
import {
  AddDatabaseFieldDto,
  AddTechnicalCatalogEntryDto,
  CreateApiEndpointDto,
  CreateBusinessRuleDto,
  CreateDatabaseTableCatalogDto,
  SetGlobalParameterDto,
} from './dto/catalog.dto';

@ApiTags('Administración - Catálogos técnicos')
@ApiBearerAuth()
@Roles(ProfileType.SUPERADMINISTRADOR)
@Controller()
export class AdminCatalogController {
  constructor(private readonly adminCatalogService: AdminCatalogService) {}

  @Post('database-table-catalog')
  createTable(@Body() dto: CreateDatabaseTableCatalogDto) {
    return this.adminCatalogService.createTable(dto);
  }

  @Get('database-table-catalog')
  findAllTables() {
    return this.adminCatalogService.findAllTables();
  }

  @Post('database-table-catalog/:tableId/fields')
  addField(
    @Param('tableId', ParseUUIDPipe) tableId: string,
    @Body() dto: AddDatabaseFieldDto,
  ) {
    return this.adminCatalogService.addField(tableId, dto);
  }

  @Post('api-endpoint-catalog')
  createEndpoint(@Body() dto: CreateApiEndpointDto) {
    return this.adminCatalogService.createEndpoint(dto);
  }

  @Get('api-endpoint-catalog')
  findAllEndpoints() {
    return this.adminCatalogService.findAllEndpoints();
  }

  @Post('business-rule-catalog')
  createBusinessRule(@Body() dto: CreateBusinessRuleDto) {
    return this.adminCatalogService.createBusinessRule(dto);
  }

  @Get('business-rule-catalog')
  findAllBusinessRules() {
    return this.adminCatalogService.findAllBusinessRules();
  }

  @Post('global-parameters')
  setGlobalParameter(@Body() dto: SetGlobalParameterDto) {
    return this.adminCatalogService.setGlobalParameter(dto);
  }

  @Get('global-parameters')
  findAllGlobalParameters() {
    return this.adminCatalogService.findAllGlobalParameters();
  }

  @Post('technical-catalogs')
  addTechnicalCatalogEntry(@Body() dto: AddTechnicalCatalogEntryDto) {
    return this.adminCatalogService.addTechnicalCatalogEntry(dto);
  }

  @Get('technical-catalogs')
  findCatalogEntries(@Query('catalogName') catalogName: string) {
    return this.adminCatalogService.findCatalogEntries(catalogName);
  }
}
