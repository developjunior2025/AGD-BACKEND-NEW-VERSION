import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortYardSlot } from './port-yard-slot.entity';

/** port_yards (§9.4 / §4.4.2 "Registro de patio"). */
@Entity('port_yards')
export class PortYard extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'int', nullable: true })
  capacity: number | null;

  @OneToMany(() => PortYardSlot, (slot) => slot.yard)
  slots: PortYardSlot[];
}
