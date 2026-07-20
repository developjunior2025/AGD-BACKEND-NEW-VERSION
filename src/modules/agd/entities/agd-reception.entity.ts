import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { AgdEntryRequest } from './agd-entry-request.entity';
import { ReceptionStatus } from '../enums/agd.enums';
import { AgdCustodyLot } from './agd-custody-lot.entity';

/** agd_receptions (§9.5 / §4.4.3 "Orden de recepción" y "Acta de recepción"). */
@Entity('agd_receptions')
export class AgdReception extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'entry_request_id', type: 'uuid' })
  entryRequestId: string;

  @OneToOne(() => AgdEntryRequest, (entryRequest) => entryRequest.reception)
  @JoinColumn({ name: 'entry_request_id' })
  entryRequest: AgdEntryRequest;

  @Column({ name: 'received_at', type: 'timestamp', nullable: true })
  receivedAt: Date | null;

  @Column({ name: 'received_by', type: 'uuid', nullable: true })
  receivedBy: string | null;

  @Column({
    type: 'enum',
    enum: ReceptionStatus,
    default: ReceptionStatus.PENDIENTE,
  })
  status: ReceptionStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @OneToMany(() => AgdCustodyLot, (lot) => lot.reception)
  lots: AgdCustodyLot[];
}
