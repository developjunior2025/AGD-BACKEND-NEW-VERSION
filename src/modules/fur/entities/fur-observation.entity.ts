import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurRecord } from './fur-record.entity';

export enum FurObservationStatus {
  ABIERTA = 'abierta',
  EN_SUBSANACION = 'en_subsanacion',
  CERRADA = 'cerrada',
}

/** Observación y subsanación sobre un FUR (§4.5.2, regla §10). */
@Entity('fur_observations')
export class FurObservation extends BaseAuditEntity {
  @Index()
  @Column({ name: 'fur_record_id', type: 'uuid' })
  furRecordId: string;

  @ManyToOne(() => FurRecord, (record) => record.observations)
  @JoinColumn({ name: 'fur_record_id' })
  furRecord: FurRecord;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @Column({ type: 'text' })
  observation: string;

  @Column({
    type: 'enum',
    enum: FurObservationStatus,
    default: FurObservationStatus.ABIERTA,
  })
  status: FurObservationStatus;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt: Date | null;

  @Column({ name: 'closure_evidence', type: 'text', nullable: true })
  closureEvidence: string | null;
}
