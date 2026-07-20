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
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { QuoteRequestsService } from './quote-requests.service';
import { CreateQuoteRequestDto } from './dto/create-quote-request.dto';
import { SendToProvidersDto } from './dto/send-to-providers.dto';
import { CreateComparisonDto } from './dto/create-comparison.dto';

@ApiTags('Cotizaciones - Solicitudes')
@ApiBearerAuth()
@Controller('quote-requests')
export class QuoteRequestsController {
  constructor(private readonly quoteRequestsService: QuoteRequestsService) {}

  @Post()
  create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateQuoteRequestDto,
  ) {
    return this.quoteRequestsService.create(user.id, dto);
  }

  @Get('me')
  listMine(@CurrentUser() user: AuthenticatedUser) {
    return this.quoteRequestsService.listForClient(user.id);
  }

  @Post('compare')
  compare(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateComparisonDto,
  ) {
    return this.quoteRequestsService.compare(user.id, dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quoteRequestsService.findOne(id);
  }

  @Post(':id/send')
  sendToProviders(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SendToProvidersDto,
  ) {
    return this.quoteRequestsService.sendToProviders(id, dto);
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.quoteRequestsService.cancel(id);
  }
}
