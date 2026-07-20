import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** transport_trip_expenses (§9.7 / §4.4.5 "Liquidación del viaje"). */
@Entity('transport_trip_expenses')
export class TransportTripExpense extends BaseAuditEntity {
  @Index()
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @Column({ name: 'expense_type', type: 'varchar', length: 100 })
  expenseType: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ name: 'incurred_at', type: 'timestamp' })
  incurredAt: Date;
}
