import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  DocumentApprovalDecision,
  WorkflowStepAction,
} from '../enums/document-governance.enums';

export class CreateWorkflowDto {
  @IsUUID()
  documentTypeId: string;

  @IsString()
  @MaxLength(150)
  name: string;
}

export class AddWorkflowStepDto {
  @IsInt()
  stepOrder: number;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsString()
  @MaxLength(100)
  requiredRole: string;

  @IsOptional()
  @IsEnum(WorkflowStepAction)
  action?: WorkflowStepAction;
}

export class CompleteAssignmentDto {
  @IsEnum(DocumentApprovalDecision)
  decision: DocumentApprovalDecision;

  @IsOptional()
  @IsString()
  comments?: string;
}
