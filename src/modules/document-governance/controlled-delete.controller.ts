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
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { ControlledDeleteService } from './controlled-delete.service';
import {
  CreateControlledDeleteRequestDto,
  ReviewControlledDeleteRequestDto,
} from './dto/controlled-delete.dto';

const GOVERNANCE_ROLES = [
  ProfileType.SUPERADMINISTRADOR,
  ProfileType.ADMINISTRADOR_DOCUMENTAL,
];

@ApiTags('Gobernanza - Borrado controlado')
@ApiBearerAuth()
@Controller('controlled-delete-requests')
export class ControlledDeleteController {
  constructor(
    private readonly controlledDeleteService: ControlledDeleteService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateControlledDeleteRequestDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.controlledDeleteService.create(user.id, dto);
  }

  @Get('pending')
  @Roles(...GOVERNANCE_ROLES)
  listPending() {
    return this.controlledDeleteService.listPending();
  }

  @Get(':id')
  @Roles(...GOVERNANCE_ROLES)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.controlledDeleteService.findOne(id);
  }

  @Patch(':id/approve')
  @Roles(...GOVERNANCE_ROLES)
  approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReviewControlledDeleteRequestDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.controlledDeleteService.approve(id, user.id, dto);
  }

  @Patch(':id/reject')
  @Roles(...GOVERNANCE_ROLES)
  reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: ReviewControlledDeleteRequestDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.controlledDeleteService.reject(id, user.id, dto);
  }
}
