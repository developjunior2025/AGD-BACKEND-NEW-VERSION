import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortArrival } from './port-arrival.entity';
import { PortManifest } from './port-manifest.entity';
import { PortOperationClosure } from './port-operation-closure.entity';

/** port_voyages (§9.4 / §4.4.2 "Itinerario"). */
@Entity('port_voyages')
export class PortVoyage extends BaseAuditEntity {
  @Index()
  @Column({ name: 'vessel_id', type: 'uuid' })
  vesselId: string;

  @Column({ name: 'voyage_number', type: 'varchar', length: 100 })
  voyageNumber: string;

  @Column({ name: 'origin_port', type: 'varchar', length: 150, nullable: true })
  originPort: string | null;

  @Column({
    name: 'destination_port',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  destinationPort: string | null;

  @Column({ name: 'eta', type: 'timestamp', nullable: true })
  eta: Date | null;

  @OneToOne(() => PortArrival, (arrival) => arrival.voyage)
  arrival: PortArrival;

  @OneToMany(() => PortManifest, (manifest) => manifest.voyage)
  manifests: PortManifest[];

  @OneToOne(() => PortOperationClosure, (closure) => closure.voyage)
  closure: PortOperationClosure;
}
