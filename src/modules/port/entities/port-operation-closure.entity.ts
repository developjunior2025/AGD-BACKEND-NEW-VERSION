import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortVoyage } from './port-voyage.entity';

/** port_operation_closures (§9.4 / §4.4.2 "Cierre operativo de escala"). */
@Entity('port_operation_closures')
export class PortOperationClosure extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'voyage_id', type: 'uuid' })
  voyageId: string;

  @OneToOne(() => PortVoyage, (voyage) => voyage.closure)
  @JoinColumn({ name: 'voyage_id' })
  voyage: PortVoyage;

  @Column({ name: 'closed_by', type: 'uuid' })
  closedBy: string;

  @Column({ name: 'closed_at', type: 'timestamp' })
  closedAt: Date;

  @Column({ type: 'text', nullable: true })
  summary: string | null;
}
