import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** wms_lots (§9.6 / §4.4.4 "Lotes y series"). */
@Entity('wms_lots')
export class WmsLot extends BaseAuditEntity {
  @Index()
  @Column({ name: 'sku_id', type: 'uuid' })
  skuId: string;

  @Column({ name: 'lot_number', type: 'varchar', length: 100 })
  lotNumber: string;

  @Column({ name: 'manufactured_at', type: 'date', nullable: true })
  manufacturedAt: string | null;

  @Column({ name: 'expires_at', type: 'date', nullable: true })
  expiresAt: string | null;
}
