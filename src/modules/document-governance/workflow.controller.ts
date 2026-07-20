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
import { WorkflowService } from './workflow.service';
import {
  AddWorkflowStepDto,
  CompleteAssignmentDto,
  CreateWorkflowDto,
} from './dto/workflow.dto';

const GOVERNANCE_ROLES = [
  ProfileType.SUPERADMINISTRADOR,
  ProfileType.ADMINISTRADOR_DOCUMENTAL,
];

@ApiTags('Gobernanza - Workflow')
@ApiBearerAuth()
@Controller()
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post('document-workflows')
  @Roles(...GOVERNANCE_ROLES)
  create(@Body() dto: CreateWorkflowDto) {
    return this.workflowService.create(dto);
  }

  @Get('document-workflows/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.workflowService.findOne(id);
  }

  @Get('document-workflows')
  findByDocumentType(
    @Query('documentTypeId', ParseUUIDPipe) documentTypeId: string,
  ) {
    return this.workflowService.findByDocumentType(documentTypeId);
  }

  @Post('document-workflows/:id/steps')
  @Roles(...GOVERNANCE_ROLES)
  addStep(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AddWorkflowStepDto,
  ) {
    return this.workflowService.addStep(id, dto);
  }

  @Post('document-workflows/:id/assign')
  @Roles(...GOVERNANCE_ROLES)
  assignFirstStep(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('documentInstanceId', ParseUUIDPipe) documentInstanceId: string,
    @Query('assigneeId', ParseUUIDPipe) assigneeId: string,
  ) {
    return this.workflowService.assignFirstStep(
      id,
      documentInstanceId,
      assigneeId,
    );
  }

  @Get('workflow-assignments/by-document/:documentInstanceId')
  listAssignmentsForDocument(
    @Param('documentInstanceId', ParseUUIDPipe) documentInstanceId: string,
  ) {
    return this.workflowService.listAssignmentsForDocument(documentInstanceId);
  }

  @Get('workflow-assignments/me')
  listMyAssignments(@CurrentUser() user: AuthenticatedUser) {
    return this.workflowService.listAssignmentsForAssignee(user.id);
  }

  @Patch('workflow-assignments/:id/complete')
  completeAssignment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CompleteAssignmentDto,
  ) {
    return this.workflowService.completeAssignment(id, dto);
  }
}
