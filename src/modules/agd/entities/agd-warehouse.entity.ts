import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** agd_warehouses (§9.5): catálogo de almacenes generales de depósito. */
@Entity('agd_warehouses')
export class AgdWarehouse extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  location: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  capacity: string | null;
}
