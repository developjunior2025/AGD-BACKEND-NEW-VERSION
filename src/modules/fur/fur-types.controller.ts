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
import { FurTypesService } from './fur-types.service';
import { CreateFurTypeDto } from './dto/create-fur-type.dto';

@ApiTags('FUR - Tipos')
@ApiBearerAuth()
@Controller('fur-types')
export class FurTypesController {
  constructor(private readonly furTypesService: FurTypesService) {}

  @Post()
  @Roles(ProfileType.SUPERADMINISTRADOR, ProfileType.ADMINISTRADOR_DOCUMENTAL)
  create(@Body() dto: CreateFurTypeDto) {
    return this.furTypesService.create(dto);
  }

  @Get()
  findAll() {
    return this.furTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.furTypesService.findOne(id);
  }
}
