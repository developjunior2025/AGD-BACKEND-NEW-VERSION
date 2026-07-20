import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { AgdEntryRequest } from './agd-entry-request.entity';

/** agd_operation_closures (§9.5 / §6.4 paso 8 "Cerrar y auditar"). */
@Entity('agd_operation_closures')
export class AgdOperationClosure extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'entry_request_id', type: 'uuid' })
  entryRequestId: string;

  @OneToOne(() => AgdEntryRequest, (entryRequest) => entryRequest.closure)
  @JoinColumn({ name: 'entry_request_id' })
  entryRequest: AgdEntryRequest;

  @Column({ name: 'closed_by', type: 'uuid' })
  closedBy: string;

  @Column({ name: 'closed_at', type: 'timestamp' })
  closedAt: Date;

  @Column({ type: 'text', nullable: true })
  summary: string | null;
}
