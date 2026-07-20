import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { RequirementStatus } from '../enums/customs.enums';

/** customs_requirements (§9.3 / §4.4.1 "Requerimientos"). */
@Entity('customs_requirements')
export class CustomsRequirement extends BaseAuditEntity {
  @Index()
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate: string | null;

  @Column({
    type: 'enum',
    enum: RequirementStatus,
    default: RequirementStatus.PENDIENTE,
  })
  status: RequirementStatus;
}
