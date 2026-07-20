import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { AgdTitlesService } from './agd-titles.service';
import { TitleType } from './enums/agd.enums';
import {
  AddEndorsementDto,
  IssueCertificateDto,
  IssuePledgeBondDto,
  SetValidityDto,
} from './dto/title.dto';

const AGD_ROLES = [ProfileType.OPERADOR_AGD, ProfileType.SUPERADMINISTRADOR];

@ApiTags('AGD - Títulos')
@ApiBearerAuth()
@Roles(...AGD_ROLES)
@Controller()
export class AgdTitlesController {
  constructor(private readonly agdTitlesService: AgdTitlesService) {}

  @Post('agd-custody-lots/:lotId/deposit-certificates')
  issueCertificate(
    @Param('lotId', ParseUUIDPipe) lotId: string,
    @Body() dto: IssueCertificateDto,
  ) {
    return this.agdTitlesService.issueCertificate(lotId, dto);
  }

  @Get('agd-custody-lots/:lotId/deposit-certificates')
  listCertificatesForLot(@Param('lotId', ParseUUIDPipe) lotId: string) {
    return this.agdTitlesService.listCertificatesForLot(lotId);
  }

  @Post('agd-custody-lots/:lotId/pledge-bonds')
  issuePledgeBond(
    @Param('lotId', ParseUUIDPipe) lotId: string,
    @Body() dto: IssuePledgeBondDto,
  ) {
    return this.agdTitlesService.issuePledgeBond(lotId, dto);
  }

  @Get('agd-custody-lots/:lotId/pledge-bonds')
  listBondsForLot(@Param('lotId', ParseUUIDPipe) lotId: string) {
    return this.agdTitlesService.listBondsForLot(lotId);
  }

  @Post('agd-title-endorsements')
  addEndorsement(
    @Body() dto: AddEndorsementDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.agdTitlesService.addEndorsement(user.id, dto);
  }

  @Get('agd-title-endorsements/:titleId')
  listEndorsements(@Param('titleId', ParseUUIDPipe) titleId: string) {
    return this.agdTitlesService.listEndorsements(titleId);
  }

  @Post('agd-title-validities')
  setValidity(@Body() dto: SetValidityDto) {
    return this.agdTitlesService.setValidity(dto);
  }

  @Post('agd-titles/:titleType/:titleId/release')
  release(
    @Param('titleType', new ParseEnumPipe(TitleType)) titleType: TitleType,
    @Param('titleId', ParseUUIDPipe) titleId: string,
  ) {
    return this.agdTitlesService.release(titleType, titleId);
  }
}
