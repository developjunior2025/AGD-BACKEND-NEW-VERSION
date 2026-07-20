import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/types/jwt-payload.interface';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { CreateOrganizationBranchDto } from './dto/create-organization-branch.dto';
import { CreateOrganizationRoleDto } from './dto/create-organization-role.dto';
import { InviteMemberDto } from './dto/invite-member.dto';

@ApiTags('Organizaciones')
@ApiBearerAuth()
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  create(
    @Body() dto: CreateOrganizationDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.organizationsService.create(dto, user.id);
  }

  @Get()
  findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.organizationsService.findOne(id);
  }

  @Post(':id/branches')
  addBranch(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateOrganizationBranchDto,
  ) {
    return this.organizationsService.addBranch(id, dto);
  }

  @Post(':id/roles')
  addRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateOrganizationRoleDto,
  ) {
    return this.organizationsService.addRole(id, dto);
  }

  @Post(':id/members')
  inviteMember(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: InviteMemberDto,
  ) {
    return this.organizationsService.inviteMember(id, dto);
  }

  @Get(':id/members')
  listMembers(@Param('id', ParseUUIDPipe) id: string) {
    return this.organizationsService.listMembers(id);
  }
}
