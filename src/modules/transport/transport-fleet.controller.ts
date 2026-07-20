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
import { TransportFleetService } from './transport-fleet.service';
import {
  AddDriverCredentialDto,
  AddVehicleDocumentDto,
  CreateCompanyDto,
  CreateDriverDto,
  CreateVehicleDto,
} from './dto/fleet.dto';

const TRANSPORT_ROLES = [
  ProfileType.TRANSPORTISTA,
  ProfileType.SUPERADMINISTRADOR,
];

@ApiTags('Transporte - Flota')
@ApiBearerAuth()
@Roles(...TRANSPORT_ROLES)
@Controller()
export class TransportFleetController {
  constructor(private readonly transportFleetService: TransportFleetService) {}

  @Post('transport-companies')
  createCompany(@Body() dto: CreateCompanyDto) {
    return this.transportFleetService.createCompany(dto);
  }

  @Get('transport-companies')
  findAllCompanies() {
    return this.transportFleetService.findAllCompanies();
  }

  @Post('transport-companies/:companyId/vehicles')
  createVehicle(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() dto: CreateVehicleDto,
  ) {
    return this.transportFleetService.createVehicle(companyId, dto);
  }

  @Get('transport-companies/:companyId/vehicles')
  findVehiclesForCompany(@Param('companyId', ParseUUIDPipe) companyId: string) {
    return this.transportFleetService.findVehiclesForCompany(companyId);
  }

  @Post('transport-vehicles/:vehicleId/documents')
  addVehicleDocument(
    @Param('vehicleId', ParseUUIDPipe) vehicleId: string,
    @Body() dto: AddVehicleDocumentDto,
  ) {
    return this.transportFleetService.addVehicleDocument(vehicleId, dto);
  }

  @Post('transport-companies/:companyId/drivers')
  createDriver(
    @Param('companyId', ParseUUIDPipe) companyId: string,
    @Body() dto: CreateDriverDto,
  ) {
    return this.transportFleetService.createDriver(companyId, dto);
  }

  @Get('transport-companies/:companyId/drivers')
  findDriversForCompany(@Param('companyId', ParseUUIDPipe) companyId: string) {
    return this.transportFleetService.findDriversForCompany(companyId);
  }

  @Post('transport-drivers/:driverId/credentials')
  addDriverCredential(
    @Param('driverId', ParseUUIDPipe) driverId: string,
    @Body() dto: AddDriverCredentialDto,
  ) {
    return this.transportFleetService.addDriverCredential(driverId, dto);
  }
}
