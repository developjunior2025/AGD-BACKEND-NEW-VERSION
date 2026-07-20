import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { EquipmentStatus } from '../enums/port.enums';

/** port_equipment (§9.4 / §4.4.2 "Registro de equipos"). */
@Entity('port_equipment')
export class PortEquipment extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'equipment_type', type: 'varchar', length: 100 })
  equipmentType: string;

  @Column({
    type: 'enum',
    enum: EquipmentStatus,
    default: EquipmentStatus.DISPONIBLE,
  })
  status: EquipmentStatus;
}
