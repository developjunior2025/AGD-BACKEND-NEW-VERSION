import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import {
  AddGuaranteeDto,
  AddMilestoneDto,
} from './dto/milestone-guarantee.dto';

@ApiTags('Contratos')
@ApiBearerAuth()
@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('orders/:orderId')
  create(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Body() dto: CreateContractDto,
  ) {
    return this.contractsService.create(orderId, dto);
  }

  @Patch(':id/activate')
  activate(@Param('id', ParseUUIDPipe) id: string) {
    return this.contractsService.activate(id);
  }

  @Patch(':id/finalize')
  finalize(@Param('id', ParseUUIDPipe) id: string) {
    return this.contractsService.finalize(id);
  }

  @Patch(':id/rescind')
  rescind(@Param('id', ParseUUIDPipe) id: string) {
    return this.contractsService.rescind(id);
  }

  @Post(':id/milestones')
  addMilestone(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddMilestoneDto,
  ) {
    return this.contractsService.addMilestone(id, dto);
  }

  @Patch('milestones/:milestoneId/complete')
  completeMilestone(@Param('milestoneId', ParseUUIDPipe) milestoneId: string) {
    return this.contractsService.completeMilestone(milestoneId);
  }

  @Post(':id/guarantees')
  addGuarantee(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddGuaranteeDto,
  ) {
    return this.contractsService.addGuarantee(id, dto);
  }
}
