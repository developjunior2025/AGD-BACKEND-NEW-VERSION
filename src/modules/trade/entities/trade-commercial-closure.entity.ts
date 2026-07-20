import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** trade_commercial_closures (§9.8 / §4.4.6 "Acta de cierre comercial"). */
@Entity('trade_commercial_closures')
export class TradeCommercialClosure extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'order_id', type: 'uuid' })
  orderId: string;

  @Column({ name: 'closed_by', type: 'uuid' })
  closedBy: string;

  @Column({ name: 'closed_at', type: 'timestamp' })
  closedAt: Date;

  @Column({ type: 'text', nullable: true })
  summary: string | null;
}
