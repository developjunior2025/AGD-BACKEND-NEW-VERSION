import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { AgdCustodyLot } from './agd-custody-lot.entity';
import { CustodyMovementType } from '../enums/agd.enums';

/** agd_custody_movements (§9.5 / §4.4.3 "Kardex" y "Movimiento interno"). */
@Entity('agd_custody_movements')
export class AgdCustodyMovement extends BaseAuditEntity {
  @Index()
  @Column({ name: 'lot_id', type: 'uuid' })
  lotId: string;

  @ManyToOne(() => AgdCustodyLot, (lot) => lot.movements)
  @JoinColumn({ name: 'lot_id' })
  lot: AgdCustodyLot;

  @Column({ name: 'movement_type', type: 'enum', enum: CustodyMovementType })
  movementType: CustodyMovementType;

  @Column({ type: 'decimal', precision: 14, scale: 3 })
  quantity: string;

  @Column({ name: 'occurred_at', type: 'timestamp' })
  occurredAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
