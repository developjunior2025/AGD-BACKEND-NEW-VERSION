import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CycleCountStatus } from '../enums/wms.enums';

/** wms_cycle_counts (§9.6 / §4.4.4 "Conteos cíclicos"). */
@Entity('wms_cycle_counts')
export class WmsCycleCount extends BaseAuditEntity {
  @Index()
  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @Column({ name: 'sku_id', type: 'uuid' })
  skuId: string;

  @Column({ name: 'location_id', type: 'uuid' })
  locationId: string;

  @Column({
    name: 'expected_quantity',
    type: 'decimal',
    precision: 14,
    scale: 3,
    nullable: true,
  })
  expectedQuantity: string | null;

  @Column({
    name: 'counted_quantity',
    type: 'decimal',
    precision: 14,
    scale: 3,
    nullable: true,
  })
  countedQuantity: string | null;

  @Column({ name: 'counted_by', type: 'uuid', nullable: true })
  countedBy: string | null;

  @Column({ name: 'counted_at', type: 'timestamp', nullable: true })
  countedAt: Date | null;

  @Column({
    type: 'enum',
    enum: CycleCountStatus,
    default: CycleCountStatus.PROGRAMADO,
  })
  status: CycleCountStatus;
}
