import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortVoyage } from './port-voyage.entity';
import { ArrivalStatus } from '../enums/port.enums';
import { PortBerthRequest } from './port-berth-request.entity';

/** port_arrivals (§9.4 / §4.4.2 "Solicitud de arribo" y "Aviso de arribo"). */
@Entity('port_arrivals')
export class PortArrival extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'voyage_id', type: 'uuid' })
  voyageId: string;

  @OneToOne(() => PortVoyage, (voyage) => voyage.arrival)
  @JoinColumn({ name: 'voyage_id' })
  voyage: PortVoyage;

  @Column({ name: 'requested_at', type: 'timestamp' })
  requestedAt: Date;

  @Column({ name: 'confirmed_at', type: 'timestamp', nullable: true })
  confirmedAt: Date | null;

  @Column({ name: 'actual_arrival_at', type: 'timestamp', nullable: true })
  actualArrivalAt: Date | null;

  @Column({
    type: 'enum',
    enum: ArrivalStatus,
    default: ArrivalStatus.SOLICITADO,
  })
  status: ArrivalStatus;

  @OneToOne(() => PortBerthRequest, (request) => request.arrival)
  berthRequest: PortBerthRequest;
}
