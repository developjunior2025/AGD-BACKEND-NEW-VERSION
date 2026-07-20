import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentType } from './entities/document-type.entity';
import { DocumentTemplate } from './entities/document-template.entity';
import { DocumentTemplateField } from './entities/document-template-field.entity';
import { DocumentTemplateRule } from './entities/document-template-rule.entity';
import { DocumentInstance } from './entities/document-instance.entity';
import { DocumentVersion } from './entities/document-version.entity';
import { DocumentStateHistory } from './entities/document-state-history.entity';
import { DocumentApproval } from './entities/document-approval.entity';
import { DocumentSignature } from './entities/document-signature.entity';
import { DocumentObservation } from './entities/document-observation.entity';
import { DocumentRemediation } from './entities/document-remediation.entity';
import { DocumentRetentionRule } from './entities/document-retention-rule.entity';
import { DocumentTypeWorkflow } from './entities/document-type-workflow.entity';
import { WorkflowStep } from './entities/workflow-step.entity';
import { WorkflowAssignment } from './entities/workflow-assignment.entity';
import { WorkflowDecision } from './entities/workflow-decision.entity';
import { GovernanceMatrix } from './entities/governance-matrix.entity';
import { GovernanceMatrixRule } from './entities/governance-matrix-rule.entity';
import { ControlledDeleteRequest } from './entities/controlled-delete-request.entity';
import { DocumentTypesService } from './document-types.service';
import { DocumentInstancesService } from './document-instances.service';
import { WorkflowService } from './workflow.service';
import { GovernanceMatrixService } from './governance-matrix.service';
import { ControlledDeleteService } from './controlled-delete.service';
import { DocumentTypesController } from './document-types.controller';
import { DocumentInstancesController } from './document-instances.controller';
import { WorkflowController } from './workflow.controller';
import { GovernanceMatrixController } from './governance-matrix.controller';
import { ControlledDeleteController } from './controlled-delete.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentType,
      DocumentTemplate,
      DocumentTemplateField,
      DocumentTemplateRule,
      DocumentInstance,
      DocumentVersion,
      DocumentStateHistory,
      DocumentApproval,
      DocumentSignature,
      DocumentObservation,
      DocumentRemediation,
      DocumentRetentionRule,
      DocumentTypeWorkflow,
      WorkflowStep,
      WorkflowAssignment,
      WorkflowDecision,
      GovernanceMatrix,
      GovernanceMatrixRule,
      ControlledDeleteRequest,
    ]),
  ],
  controllers: [
    DocumentTypesController,
    DocumentInstancesController,
    WorkflowController,
    GovernanceMatrixController,
    ControlledDeleteController,
  ],
  providers: [
    DocumentTypesService,
    DocumentInstancesService,
    WorkflowService,
    GovernanceMatrixService,
    ControlledDeleteService,
  ],
  exports: [
    DocumentTypesService,
    DocumentInstancesService,
    WorkflowService,
    GovernanceMatrixService,
    ControlledDeleteService,
  ],
})
export class DocumentGovernanceModule {}
