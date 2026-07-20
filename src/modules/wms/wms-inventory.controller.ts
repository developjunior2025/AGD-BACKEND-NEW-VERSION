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
import { WmsInventoryService } from './wms-inventory.service';
import {
  AddReceiptItemDto,
  CreateReceiptDto,
  ReceiveItemDto,
} from './dto/receipt.dto';
import {
  CreateAdjustmentDto,
  CreateCycleCountDto,
  CreateReservationDto,
  RecordCountDto,
} from './dto/inventory.dto';
import { CreatePickingRuleDto, CreatePutawayRuleDto } from './dto/rules.dto';

const WMS_ROLES = [ProfileType.OPERADOR_WMS, ProfileType.SUPERADMINISTRADOR];

@ApiTags('WMS - Inventario')
@ApiBearerAuth()
@Roles(...WMS_ROLES)
@Controller()
export class WmsInventoryController {
  constructor(private readonly wmsInventoryService: WmsInventoryService) {}

  @Post('wms-receipts')
  createReceipt(@Body() dto: CreateReceiptDto) {
    return this.wmsInventoryService.createReceipt(dto);
  }

  @Get('wms-receipts/:id')
  findReceipt(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsInventoryService.findReceipt(id);
  }

  @Post('wms-receipts/:id/items')
  addReceiptItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddReceiptItemDto,
  ) {
    return this.wmsInventoryService.addReceiptItem(id, dto);
  }

  @Patch('wms-receipt-items/:itemId/receive')
  receiveItem(
    @Param('itemId', ParseUUIDPipe) itemId: string,
    @Body() dto: ReceiveItemDto,
  ) {
    return this.wmsInventoryService.receiveItem(itemId, dto);
  }

  @Patch('wms-receipts/:id/complete')
  completeReceipt(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsInventoryService.completeReceipt(id);
  }

  @Get('wms-inventory-balances')
  findBalances(@Query('skuId', ParseUUIDPipe) skuId: string) {
    return this.wmsInventoryService.findBalances(skuId);
  }

  @Post('wms-inventory-reservations')
  createReservation(@Body() dto: CreateReservationDto) {
    return this.wmsInventoryService.createReservation(dto);
  }

  @Patch('wms-inventory-reservations/:id/release')
  releaseReservation(@Param('id', ParseUUIDPipe) id: string) {
    return this.wmsInventoryService.releaseReservation(id);
  }

  @Post('wms-cycle-counts')
  createCycleCount(@Body() dto: CreateCycleCountDto) {
    return this.wmsInventoryService.createCycleCount(dto);
  }

  @Patch('wms-cycle-counts/:id/record')
  recordCount(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RecordCountDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.wmsInventoryService.recordCount(id, user.id, dto);
  }

  @Post('wms-inventory-adjustments')
  createAdjustment(
    @Body() dto: CreateAdjustmentDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.wmsInventoryService.createAdjustment(user.id, dto);
  }

  @Post('wms-putaway-rules')
  createPutawayRule(@Body() dto: CreatePutawayRuleDto) {
    return this.wmsInventoryService.createPutawayRule(dto);
  }

  @Get('wms-putaway-rules')
  findAllPutawayRules() {
    return this.wmsInventoryService.findAllPutawayRules();
  }

  @Post('wms-picking-rules')
  createPickingRule(@Body() dto: CreatePickingRuleDto) {
    return this.wmsInventoryService.createPickingRule(dto);
  }

  @Get('wms-picking-rules')
  findAllPickingRules() {
    return this.wmsInventoryService.findAllPickingRules();
  }
}
