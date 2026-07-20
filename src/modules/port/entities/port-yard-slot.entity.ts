import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortYard } from './port-yard.entity';
import { YardSlotStatus } from '../enums/port.enums';

/** port_yard_slots (§9.4): ubicaciones dentro de un patio. */
@Entity('port_yard_slots')
export class PortYardSlot extends BaseAuditEntity {
  @Index()
  @Column({ name: 'yard_id', type: 'uuid' })
  yardId: string;

  @ManyToOne(() => PortYard, (yard) => yard.slots)
  @JoinColumn({ name: 'yard_id' })
  yard: PortYard;

  @Column({ name: 'slot_code', type: 'varchar', length: 50 })
  slotCode: string;

  @Column({ name: 'container_id', type: 'uuid', nullable: true })
  containerId: string | null;

  @Column({ type: 'enum', enum: YardSlotStatus, default: YardSlotStatus.LIBRE })
  status: YardSlotStatus;
}
