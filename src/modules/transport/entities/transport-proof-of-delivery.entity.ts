import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportTrip } from './transport-trip.entity';

/** transport_proof_of_delivery (§9.7 / §4.4.5 "Prueba de entrega —POD—" y "Evidencias fotográficas"). */
@Entity('transport_proof_of_delivery')
export class TransportProofOfDelivery extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'trip_id', type: 'uuid' })
  tripId: string;

  @OneToOne(() => TransportTrip, (trip) => trip.proofOfDelivery)
  @JoinColumn({ name: 'trip_id' })
  trip: TransportTrip;

  @Column({ name: 'delivered_at', type: 'timestamp' })
  deliveredAt: Date;

  @Column({ name: 'received_by', type: 'varchar', length: 200, nullable: true })
  receivedBy: string | null;

  @Column({
    name: 'signature_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  signatureUrl: string | null;

  @Column({ name: 'photo_urls', type: 'json', nullable: true })
  photoUrls: string[] | null;
}
