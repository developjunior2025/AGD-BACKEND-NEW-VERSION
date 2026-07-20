import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** transport_waybills (§9.7 / §4.4.5 "Carta de porte"). */
@Entity('transport_waybills')
export class TransportWaybill extends BaseAuditEntity {
  @Index()
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @Index({ unique: true })
  @Column({ name: 'waybill_number', type: 'varchar', length: 100 })
  waybillNumber: string;

  @Column({ name: 'issued_at', type: 'timestamp' })
  issuedAt: Date;
}
