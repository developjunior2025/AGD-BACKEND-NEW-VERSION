import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CustomsDeclarationStatus } from '../enums/customs.enums';

/** customs_status_history (§9.3, regla §10: trazabilidad de estados). */
@Entity('customs_status_history')
export class CustomsStatusHistory extends BaseAuditEntity {
  @Index()
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @Column({
    name: 'previous_status',
    type: 'enum',
    enum: CustomsDeclarationStatus,
    nullable: true,
  })
  previousStatus: CustomsDeclarationStatus | null;

  @Column({ name: 'new_status', type: 'enum', enum: CustomsDeclarationStatus })
  newStatus: CustomsDeclarationStatus;

  @Column({ name: 'changed_by', type: 'uuid', nullable: true })
  changedBy: string | null;

  @Column({ type: 'text', nullable: true })
  reason: string | null;
}
