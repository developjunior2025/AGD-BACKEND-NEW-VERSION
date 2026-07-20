import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** port_vessels (§9.4): catálogo de buques. */
@Entity('port_vessels')
export class PortVessel extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Index({ unique: true })
  @Column({ name: 'imo_number', type: 'varchar', length: 20 })
  imoNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  flag: string | null;

  @Column({ name: 'vessel_type', type: 'varchar', length: 100, nullable: true })
  vesselType: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  capacity: string | null;
}
