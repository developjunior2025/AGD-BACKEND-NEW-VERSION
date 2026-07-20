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
import { TradeDocumentsService } from './trade-documents.service';
import { CloseCommercialDto } from './dto/closure.dto';

const GOVERNANCE_ROLES = [
  ProfileType.SUPERADMINISTRADOR,
  ProfileType.ADMINISTRADOR_DOCUMENTAL,
];

@ApiTags('Documentos comerciales')
@ApiBearerAuth()
@Controller('trade-documents')
export class TradeDocumentsController {
  constructor(private readonly tradeDocumentsService: TradeDocumentsService) {}

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tradeDocumentsService.findOne(id);
  }

  @Get()
  listForCargoFile(@Query('cargoFileId', ParseUUIDPipe) cargoFileId: string) {
    return this.tradeDocumentsService.listForCargoFile(cargoFileId);
  }

  @Patch(':id/void')
  @Roles(...GOVERNANCE_ROLES)
  voidDocument(@Param('id', ParseUUIDPipe) id: string) {
    return this.tradeDocumentsService.voidDocument(id);
  }

  @Post('orders/:orderId/close')
  @Roles(...GOVERNANCE_ROLES)
  closeCommercial(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() dto: CloseCommercialDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.tradeDocumentsService.closeCommercial(orderId, user.id, dto);
  }
}
