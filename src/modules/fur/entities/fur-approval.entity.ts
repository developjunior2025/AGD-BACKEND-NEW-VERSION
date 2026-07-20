import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurRecord } from './fur-record.entity';

export enum FurApprovalDecision {
  APROBADO = 'aprobado',
  RECHAZADO = 'rechazado',
  OBSERVADO = 'observado',
}

/** Aprobación de un FUR dentro de su workflow de revisión (§4.5.1, §9.9). */
@Entity('fur_approvals')
export class FurApproval extends BaseAuditEntity {
  @Index()
  @Column({ name: 'fur_record_id', type: 'uuid' })
  furRecordId: string;

  @ManyToOne(() => FurRecord, (record) => record.approvals)
  @JoinColumn({ name: 'fur_record_id' })
  furRecord: FurRecord;

  @Column({ name: 'approver_id', type: 'uuid' })
  approverId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  role: string | null;

  @Column({ type: 'enum', enum: FurApprovalDecision })
  decision: FurApprovalDecision;

  @Column({ type: 'text', nullable: true })
  comments: string | null;

  @Column({ name: 'decided_at', type: 'timestamp' })
  decidedAt: Date;
}
