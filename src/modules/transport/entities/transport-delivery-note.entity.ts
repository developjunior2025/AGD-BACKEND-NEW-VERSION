import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** transport_delivery_notes (§9.7 / §4.4.5 "Guía de remisión"). */
@Entity('transport_delivery_notes')
export class TransportDeliveryNote extends BaseAuditEntity {
  @Index()
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @Index({ unique: true })
  @Column({ name: 'note_number', type: 'varchar', length: 100 })
  noteNumber: string;

  @Column({ name: 'issued_at', type: 'timestamp' })
  issuedAt: Date;
}
