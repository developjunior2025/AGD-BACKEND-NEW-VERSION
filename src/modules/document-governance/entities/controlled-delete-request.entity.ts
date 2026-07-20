import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ControlledDeleteStatus } from '../enums/document-governance.enums';

/**
 * controlled_delete_requests (§9.9, regla §10: "La eliminación excepcional
 * requerirá autorización, justificación y auditoría").
 */
@Entity('controlled_delete_requests')
export class ControlledDeleteRequest extends BaseAuditEntity {
  @Index()
  @Column({ name: 'entity_type', type: 'varchar', length: 150 })
  entityType: string;

  @Index()
  @Column({ name: 'entity_id', type: 'uuid' })
  entityId: string;

  @Column({ name: 'requested_by', type: 'uuid' })
  requestedBy: string;

  @Column({ type: 'text' })
  justification: string;

  @Column({
    type: 'enum',
    enum: ControlledDeleteStatus,
    default: ControlledDeleteStatus.PENDIENTE,
  })
  status: ControlledDeleteStatus;

  @Column({ name: 'reviewed_by', type: 'uuid', nullable: true })
  reviewedBy: string | null;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  reviewedAt: Date | null;

  @Column({ type: 'text', nullable: true })
  reason: string | null;
}
