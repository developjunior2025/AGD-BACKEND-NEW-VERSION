import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CustomsObservationStatus } from '../enums/customs.enums';

/** customs_observations (§9.3). */
@Entity('customs_observations')
export class CustomsObservation extends BaseAuditEntity {
  @Index()
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @Column({ type: 'text' })
  observation: string;

  @Column({
    type: 'enum',
    enum: CustomsObservationStatus,
    default: CustomsObservationStatus.ABIERTA,
  })
  status: CustomsObservationStatus;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt: Date | null;
}
