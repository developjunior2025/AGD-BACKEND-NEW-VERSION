import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TradeShippingDocsService } from './trade-shipping-docs.service';
import {
  AddPackingListItemDto,
  CreateAirWaybillDto,
  CreateBillOfLadingDto,
  CreateCertificateOfOriginDto,
  CreatePackingListDto,
  CreateShippingInstructionDto,
} from './dto/shipping-docs.dto';

@ApiTags('Documentos comerciales - Embarque')
@ApiBearerAuth()
@Controller()
export class TradeShippingDocsController {
  constructor(
    private readonly tradeShippingDocsService: TradeShippingDocsService,
  ) {}

  @Post('trade-packing-lists')
  createPackingList(@Body() dto: CreatePackingListDto) {
    return this.tradeShippingDocsService.createPackingList(dto);
  }

  @Get('trade-packing-lists/:id')
  findPackingList(@Param('id', ParseUUIDPipe) id: string) {
    return this.tradeShippingDocsService.findPackingList(id);
  }

  @Post('trade-packing-lists/:id/items')
  addPackingListItem(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddPackingListItemDto,
  ) {
    return this.tradeShippingDocsService.addPackingListItem(id, dto);
  }

  @Post('trade-bills-of-lading')
  createBillOfLading(@Body() dto: CreateBillOfLadingDto) {
    return this.tradeShippingDocsService.createBillOfLading(dto);
  }

  @Post('trade-air-waybills')
  createAirWaybill(@Body() dto: CreateAirWaybillDto) {
    return this.tradeShippingDocsService.createAirWaybill(dto);
  }

  @Post('trade-certificates-of-origin')
  createCertificateOfOrigin(@Body() dto: CreateCertificateOfOriginDto) {
    return this.tradeShippingDocsService.createCertificateOfOrigin(dto);
  }

  @Post('trade-shipping-instructions')
  createShippingInstruction(@Body() dto: CreateShippingInstructionDto) {
    return this.tradeShippingDocsService.createShippingInstruction(dto);
  }
}
