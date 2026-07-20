import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurStatus } from '../../fur/enums/fur-status.enum';

/** document_state_history (§9.9, regla §10: "Los cambios de estado deberán registrarse en historial"). */
@Entity('document_state_history')
export class DocumentStateHistory extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_instance_id', type: 'uuid' })
  documentInstanceId: string;

  @Column({
    name: 'previous_status',
    type: 'enum',
    enum: FurStatus,
    nullable: true,
  })
  previousStatus: FurStatus | null;

  @Column({ name: 'new_status', type: 'enum', enum: FurStatus })
  newStatus: FurStatus;

  @Column({ name: 'changed_by', type: 'uuid', nullable: true })
  changedBy: string | null;

  @Column({ type: 'text', nullable: true })
  reason: string | null;
}
