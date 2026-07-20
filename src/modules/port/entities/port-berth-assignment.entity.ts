import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortBerthRequest } from './port-berth-request.entity';

/** port_berth_assignments (§9.4 / §4.4.2 "Asignación de muelle"). */
@Entity('port_berth_assignments')
export class PortBerthAssignment extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'berth_request_id', type: 'uuid' })
  berthRequestId: string;

  @OneToOne(() => PortBerthRequest, (request) => request.assignment)
  @JoinColumn({ name: 'berth_request_id' })
  berthRequest: PortBerthRequest;

  @Column({ name: 'berth_code', type: 'varchar', length: 50 })
  berthCode: string;

  @Column({ name: 'assigned_start', type: 'timestamp' })
  assignedStart: Date;

  @Column({ name: 'assigned_end', type: 'timestamp' })
  assignedEnd: Date;

  @Column({ name: 'assigned_by', type: 'uuid', nullable: true })
  assignedBy: string | null;
}
