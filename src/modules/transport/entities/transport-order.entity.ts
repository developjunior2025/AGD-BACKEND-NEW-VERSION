import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportOrderStatus } from '../enums/transport.enums';
import { TransportTrip } from './transport-trip.entity';

/** transport_orders (§9.7 / §4.4.5 "Solicitud de servicio" y "Orden de transporte"). */
@Entity('transport_orders')
export class TransportOrder extends BaseAuditEntity {
  @Index()
  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Column({ name: 'cargo_file_id', type: 'uuid', nullable: true })
  cargoFileId: string | null;

  @Column({ name: 'origin_address', type: 'varchar', length: 500 })
  originAddress: string;

  @Column({ name: 'destination_address', type: 'varchar', length: 500 })
  destinationAddress: string;

  @Column({ name: 'requested_pickup_at', type: 'timestamp', nullable: true })
  requestedPickupAt: Date | null;

  @Column({ name: 'requested_delivery_at', type: 'timestamp', nullable: true })
  requestedDeliveryAt: Date | null;

  @Column({
    type: 'enum',
    enum: TransportOrderStatus,
    default: TransportOrderStatus.SOLICITADA,
  })
  status: TransportOrderStatus;

  @OneToMany(() => TransportTrip, (trip) => trip.order)
  trips: TransportTrip[];
}
