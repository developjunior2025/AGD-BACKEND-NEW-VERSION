import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import { PortCatalogService } from './port-catalog.service';
import {
  CreateEquipmentDto,
  CreateVesselDto,
  CreateYardDto,
  CreateYardSlotDto,
} from './dto/catalog.dto';

const PORT_ROLES = [
  ProfileType.OPERADOR_PORTUARIO,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Puerto - Catálogo')
@ApiBearerAuth()
@Roles(...PORT_ROLES)
@Controller()
export class PortCatalogController {
  constructor(private readonly portCatalogService: PortCatalogService) {}

  @Post('port-vessels')
  createVessel(@Body() dto: CreateVesselDto) {
    return this.portCatalogService.createVessel(dto);
  }

  @Get('port-vessels')
  findAllVessels() {
    return this.portCatalogService.findAllVessels();
  }

  @Post('port-equipment')
  createEquipment(@Body() dto: CreateEquipmentDto) {
    return this.portCatalogService.createEquipment(dto);
  }

  @Get('port-equipment')
  findAllEquipment() {
    return this.portCatalogService.findAllEquipment();
  }

  @Post('port-yards')
  createYard(@Body() dto: CreateYardDto) {
    return this.portCatalogService.createYard(dto);
  }

  @Get('port-yards')
  findAllYards() {
    return this.portCatalogService.findAllYards();
  }

  @Get('port-yards/:id')
  findYard(@Param('id', ParseUUIDPipe) id: string) {
    return this.portCatalogService.findYard(id);
  }

  @Post('port-yards/:id/slots')
  addYardSlot(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateYardSlotDto,
  ) {
    return this.portCatalogService.addYardSlot(id, dto);
  }
}
