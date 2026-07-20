import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { EntryRequestStatus } from '../enums/agd.enums';
import { AgdReception } from './agd-reception.entity';
import { AgdOperationClosure } from './agd-operation-closure.entity';

/** agd_entry_requests (§9.5 / §4.4.3 "Solicitud de ingreso"). */
@Entity('agd_entry_requests')
export class AgdEntryRequest extends BaseAuditEntity {
  @Index()
  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @Index()
  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'cargo_file_id', type: 'uuid', nullable: true })
  cargoFileId: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'requested_at', type: 'timestamp' })
  requestedAt: Date;

  @Column({ name: 'scheduled_at', type: 'timestamp', nullable: true })
  scheduledAt: Date | null;

  @Column({
    type: 'enum',
    enum: EntryRequestStatus,
    default: EntryRequestStatus.SOLICITADO,
  })
  status: EntryRequestStatus;

  @OneToOne(() => AgdReception, (reception) => reception.entryRequest)
  reception: AgdReception;

  @OneToOne(() => AgdOperationClosure, (closure) => closure.entryRequest)
  closure: AgdOperationClosure;
}
