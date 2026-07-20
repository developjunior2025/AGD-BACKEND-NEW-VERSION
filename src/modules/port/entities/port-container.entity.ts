import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ContainerStatus } from '../enums/port.enums';

/** port_containers (§9.4): registro físico de contenedores en operación portuaria. */
@Entity('port_containers')
export class PortContainer extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'container_number', type: 'varchar', length: 50 })
  containerNumber: string;

  @Column({
    name: 'container_type',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  containerType: string | null;

  @Column({ name: 'size_feet', type: 'int', nullable: true })
  sizeFeet: number | null;

  @Column({
    name: 'current_status',
    type: 'enum',
    enum: ContainerStatus,
    default: ContainerStatus.EN_BUQUE,
  })
  currentStatus: ContainerStatus;
}
