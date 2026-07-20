import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { ProfileType } from '../../common/enums/profile-type.enum';
import { ServiceCategoriesService } from './service-categories.service';
import {
  CreateServiceCategoryDto,
  CreateServiceSubcategoryDto,
} from './dto/create-service-category.dto';

@ApiTags('Catálogo - Categorías')
@ApiBearerAuth()
@Controller('service-categories')
export class ServiceCategoriesController {
  constructor(private readonly categoriesService: ServiceCategoriesService) {}

  @Post()
  @Roles(ProfileType.SUPERADMINISTRADOR, ProfileType.ADMINISTRADOR_DOCUMENTAL)
  create(@Body() dto: CreateServiceCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post(':id/subcategories')
  @Roles(ProfileType.SUPERADMINISTRADOR, ProfileType.ADMINISTRADOR_DOCUMENTAL)
  addSubcategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateServiceSubcategoryDto,
  ) {
    return this.categoriesService.addSubcategory(id, dto);
  }
}
