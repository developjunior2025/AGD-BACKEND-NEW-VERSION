import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ReservationStatus } from '../enums/wms.enums';

/** wms_inventory_reservations (§9.6): reservas de inventario para órdenes de picking. */
@Entity('wms_inventory_reservations')
export class WmsInventoryReservation extends BaseAuditEntity {
  @Index()
  @Column({ name: 'sku_id', type: 'uuid' })
  skuId: string;

  @Column({ name: 'location_id', type: 'uuid', nullable: true })
  locationId: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 3 })
  quantity: string;

  @Column({ name: 'reserved_for', type: 'uuid', nullable: true })
  reservedFor: string | null;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.ACTIVA,
  })
  status: ReservationStatus;
}
