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
import { GovernanceMatrixService } from './governance-matrix.service';
import { AddMatrixRuleDto, CreateMatrixDto } from './dto/governance-matrix.dto';
import { GovernanceAction } from './enums/document-governance.enums';

@ApiTags('Gobernanza - Matriz')
@ApiBearerAuth()
@Roles(ProfileType.SUPERADMINISTRADOR, ProfileType.ADMINISTRADOR_DOCUMENTAL)
@Controller('governance-matrices')
export class GovernanceMatrixController {
  constructor(
    private readonly governanceMatrixService: GovernanceMatrixService,
  ) {}

  @Post()
  create(@Body() dto: CreateMatrixDto) {
    return this.governanceMatrixService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.governanceMatrixService.findOne(id);
  }

  @Post(':id/rules')
  addRule(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddMatrixRuleDto,
  ) {
    return this.governanceMatrixService.addRule(id, dto);
  }

  @Get('check-access')
  checkAccess(
    @Query('profileType') profileType: string,
    @Query('action') action: GovernanceAction,
    @Query('documentTypeId') documentTypeId?: string,
  ) {
    return this.governanceMatrixService.checkAccess(
      profileType,
      action,
      documentTypeId,
    );
  }
}
