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
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { FurRecordsService } from './fur-records.service';
import { CreateFurRecordDto } from './dto/create-fur-record.dto';
import {
  AddFurObservationDto,
  CloseFurObservationDto,
  DecideFurDto,
} from './dto/decide-fur.dto';

const GOVERNANCE_ROLES = [
  ProfileType.SUPERADMINISTRADOR,
  ProfileType.ADMINISTRADOR_DOCUMENTAL,
];

@ApiTags('FUR - Registros')
@ApiBearerAuth()
@Controller('fur-records')
export class FurRecordsController {
  constructor(private readonly furRecordsService: FurRecordsService) {}

  @Post()
  create(
    @Body() dto: CreateFurRecordDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.furRecordsService.create(dto, user.id);
  }

  @Get()
  findAll(@Query('furTypeId') furTypeId?: string) {
    return this.furRecordsService.findAll(furTypeId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.furRecordsService.findOne(id);
  }

  @Patch(':id/submit-review')
  submitForReview(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.furRecordsService.submitForReview(id, user.id);
  }

  @Patch(':id/approve')
  @Roles(...GOVERNANCE_ROLES)
  approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: DecideFurDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.furRecordsService.approve(id, user.id, dto.comments);
  }

  @Patch(':id/reject')
  @Roles(...GOVERNANCE_ROLES)
  reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: DecideFurDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.furRecordsService.reject(id, user.id, dto.comments);
  }

  @Patch(':id/publish')
  @Roles(...GOVERNANCE_ROLES)
  publish(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.furRecordsService.publish(id, user.id);
  }

  @Patch(':id/obsolete')
  @Roles(...GOVERNANCE_ROLES)
  markObsolete(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.furRecordsService.markObsolete(id, user.id);
  }

  @Post(':id/observations')
  addObservation(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddFurObservationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.furRecordsService.addObservation(id, user.id, dto.observation);
  }

  @Patch('observations/:observationId/close')
  closeObservation(
    @Param('observationId', ParseUUIDPipe) observationId: string,
    @Body() dto: CloseFurObservationDto,
  ) {
    return this.furRecordsService.closeObservation(
      observationId,
      dto.closureEvidence,
    );
  }
}
