import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentTypeWorkflow } from './entities/document-type-workflow.entity';
import { WorkflowStep } from './entities/workflow-step.entity';
import { WorkflowAssignment } from './entities/workflow-assignment.entity';
import { WorkflowDecision } from './entities/workflow-decision.entity';
import { WorkflowAssignmentStatus } from './enums/document-governance.enums';
import {
  AddWorkflowStepDto,
  CompleteAssignmentDto,
  CreateWorkflowDto,
} from './dto/workflow.dto';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(DocumentTypeWorkflow)
    private readonly workflowRepository: Repository<DocumentTypeWorkflow>,
    @InjectRepository(WorkflowStep)
    private readonly stepRepository: Repository<WorkflowStep>,
    @InjectRepository(WorkflowAssignment)
    private readonly assignmentRepository: Repository<WorkflowAssignment>,
    @InjectRepository(WorkflowDecision)
    private readonly decisionRepository: Repository<WorkflowDecision>,
  ) {}

  create(dto: CreateWorkflowDto): Promise<DocumentTypeWorkflow> {
    return this.workflowRepository.save(this.workflowRepository.create(dto));
  }

  async findOne(id: string): Promise<DocumentTypeWorkflow> {
    const workflow = await this.workflowRepository.findOne({
      where: { id },
      relations: { steps: true },
    });
    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} no encontrado.`);
    }
    return workflow;
  }

  findByDocumentType(documentTypeId: string): Promise<DocumentTypeWorkflow[]> {
    return this.workflowRepository.find({
      where: { documentTypeId, isActive: true },
      relations: { steps: true },
    });
  }

  async addStep(
    workflowId: string,
    dto: AddWorkflowStepDto,
  ): Promise<WorkflowStep> {
    await this.findOne(workflowId);
    return this.stepRepository.save(
      this.stepRepository.create({ ...dto, workflowId }),
    );
  }

  /** Asigna el primer paso del workflow a un responsable para un documento concreto. */
  async assignFirstStep(
    workflowId: string,
    documentInstanceId: string,
    assigneeId: string,
  ): Promise<WorkflowAssignment> {
    const workflow = await this.findOne(workflowId);
    const firstStep = [...workflow.steps].sort(
      (a, b) => a.stepOrder - b.stepOrder,
    )[0];
    if (!firstStep) {
      throw new NotFoundException(
        `El workflow ${workflowId} no tiene pasos configurados.`,
      );
    }
    return this.assignmentRepository.save(
      this.assignmentRepository.create({
        documentInstanceId,
        workflowStepId: firstStep.id,
        assigneeId,
      }),
    );
  }

  listAssignmentsForDocument(
    documentInstanceId: string,
  ): Promise<WorkflowAssignment[]> {
    return this.assignmentRepository.find({
      where: { documentInstanceId },
      relations: { workflowStep: true, decisions: true },
      order: { createdAt: 'ASC' },
    });
  }

  listAssignmentsForAssignee(
    assigneeId: string,
  ): Promise<WorkflowAssignment[]> {
    return this.assignmentRepository.find({
      where: { assigneeId, status: WorkflowAssignmentStatus.PENDIENTE },
      relations: { workflowStep: true },
      order: { createdAt: 'ASC' },
    });
  }

  async completeAssignment(
    assignmentId: string,
    dto: CompleteAssignmentDto,
  ): Promise<WorkflowDecision> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id: assignmentId },
    });
    if (!assignment) {
      throw new NotFoundException(`Asignación ${assignmentId} no encontrada.`);
    }

    assignment.status = WorkflowAssignmentStatus.COMPLETADO;
    assignment.completedAt = new Date();
    await this.assignmentRepository.save(assignment);

    return this.decisionRepository.save(
      this.decisionRepository.create({
        assignmentId,
        decision: dto.decision,
        comments: dto.comments ?? null,
        decidedAt: new Date(),
      }),
    );
  }
}
