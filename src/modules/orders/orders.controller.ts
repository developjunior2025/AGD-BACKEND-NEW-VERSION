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
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { OrdersService } from './orders.service';

@ApiTags('Órdenes')
@ApiBearerAuth()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('from-quote/:providerQuoteId')
  createFromQuote(
    @Param('providerQuoteId', ParseUUIDPipe) providerQuoteId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.ordersService.createFromQuote(providerQuoteId, user.id);
  }

  @Get('me')
  listMine(@CurrentUser() user: AuthenticatedUser) {
    return this.ordersService.listForClient(user.id);
  }

  @Get('by-provider')
  listForProvider(
    @Query('providerProfileId', ParseUUIDPipe) providerProfileId: string,
  ) {
    return this.ordersService.listForProvider(providerProfileId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id/start')
  startExecution(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.startExecution(id);
  }

  @Patch(':id/complete')
  complete(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.complete(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.cancel(id);
  }
}
