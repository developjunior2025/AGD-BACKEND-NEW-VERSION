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
import { ProviderQuotesService } from './provider-quotes.service';
import {
  CreateProviderQuoteDto,
  UpdateProviderQuoteDto,
} from './dto/provider-quote.dto';
import {
  SetEconomicProposalDto,
  SetTechnicalProposalDto,
} from './dto/proposal.dto';

@ApiTags('Cotizaciones - Proveedor')
@ApiBearerAuth()
@Controller()
export class ProviderQuotesController {
  constructor(private readonly providerQuotesService: ProviderQuotesService) {}

  @Get('opportunities')
  listOpportunities(
    @Query('providerProfileId', ParseUUIDPipe) providerProfileId: string,
  ) {
    return this.providerQuotesService.listOpportunitiesForProvider(
      providerProfileId,
    );
  }

  @Patch('opportunities/:id/view')
  viewOpportunity(@Param('id', ParseUUIDPipe) id: string) {
    return this.providerQuotesService.viewOpportunity(id);
  }

  @Post('opportunities/:id/quotes')
  createQuote(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateProviderQuoteDto,
  ) {
    return this.providerQuotesService.createQuote(id, dto);
  }

  @Get('provider-quotes/:id')
  getQuote(@Param('id', ParseUUIDPipe) id: string) {
    return this.providerQuotesService.getQuote(id);
  }

  @Patch('provider-quotes/:id')
  updateQuote(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProviderQuoteDto,
  ) {
    return this.providerQuotesService.updateQuote(id, dto);
  }

  @Patch('provider-quotes/:id/submit')
  submit(@Param('id', ParseUUIDPipe) id: string) {
    return this.providerQuotesService.submit(id);
  }

  @Patch('provider-quotes/:id/reject')
  reject(@Param('id', ParseUUIDPipe) id: string) {
    return this.providerQuotesService.reject(id);
  }

  @Post('provider-quotes/:id/technical-proposal')
  setTechnicalProposal(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SetTechnicalProposalDto,
  ) {
    return this.providerQuotesService.setTechnicalProposal(id, dto);
  }

  @Post('provider-quotes/:id/economic-proposal')
  setEconomicProposal(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: SetEconomicProposalDto,
  ) {
    return this.providerQuotesService.setEconomicProposal(id, dto);
  }
}
