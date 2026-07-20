import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { OperatingWindowStatus } from '../enums/port.enums';

/** port_operating_windows (§9.4 / §4.4.2 "Ventana operativa"). */
@Entity('port_operating_windows')
export class PortOperatingWindow extends BaseAuditEntity {
  @Index()
  @Column({ name: 'berth_assignment_id', type: 'uuid' })
  berthAssignmentId: string;

  @Column({ name: 'window_start', type: 'timestamp' })
  windowStart: Date;

  @Column({ name: 'window_end', type: 'timestamp' })
  windowEnd: Date;

  @Column({
    type: 'enum',
    enum: OperatingWindowStatus,
    default: OperatingWindowStatus.PROGRAMADA,
  })
  status: OperatingWindowStatus;
}
