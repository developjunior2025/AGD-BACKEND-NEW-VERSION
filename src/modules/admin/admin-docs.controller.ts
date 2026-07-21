import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import { AdminDocsService } from './admin-docs.service';
import {
  AddModuleProfileDto,
  AddUseCaseRuleDto,
  CreateFunctionalModuleDto,
  CreateUseCaseDto,
} from './dto/docs.dto';

@ApiTags('Administración - Documentación del sistema')
@ApiBearerAuth()
@Roles(ProfileType.SUPERADMINISTRADOR)
@Controller()
export class AdminDocsController {
  constructor(private readonly adminDocsService: AdminDocsService) {}

  @Post('functional-modules')
  createModule(@Body() dto: CreateFunctionalModuleDto) {
    return this.adminDocsService.createModule(dto);
  }

  @Get('functional-modules')
  findAllModules() {
    return this.adminDocsService.findAllModules();
  }

  @Post('functional-modules/:id/profiles')
  addModuleProfile(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddModuleProfileDto,
  ) {
    return this.adminDocsService.addModuleProfile(id, dto);
  }

  @Post('use-cases')
  createUseCase(@Body() dto: CreateUseCaseDto) {
    return this.adminDocsService.createUseCase(dto);
  }

  @Get('use-cases')
  findAllUseCases() {
    return this.adminDocsService.findAllUseCases();
  }

  @Get('use-cases/:id')
  findUseCase(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminDocsService.findUseCase(id);
  }

  @Post('use-cases/:id/rules')
  addUseCaseRule(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddUseCaseRuleDto,
  ) {
    return this.adminDocsService.addUseCaseRule(id, dto);
  }
}
