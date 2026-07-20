import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsReceipt } from './wms-receipt.entity';

/** wms_receipt_items (§9.6 / §4.4.4 "Registro de bultos" y "Registro de pallets"). */
@Entity('wms_receipt_items')
export class WmsReceiptItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'receipt_id', type: 'uuid' })
  receiptId: string;

  @ManyToOne(() => WmsReceipt, (receipt) => receipt.items)
  @JoinColumn({ name: 'receipt_id' })
  receipt: WmsReceipt;

  @Column({ name: 'sku_id', type: 'uuid' })
  skuId: string;

  @Column({ name: 'lot_id', type: 'uuid', nullable: true })
  lotId: string | null;

  @Column({
    name: 'expected_quantity',
    type: 'decimal',
    precision: 14,
    scale: 3,
  })
  expectedQuantity: string;

  @Column({
    name: 'received_quantity',
    type: 'decimal',
    precision: 14,
    scale: 3,
    default: 0,
  })
  receivedQuantity: string;

  @Column({ name: 'location_id', type: 'uuid', nullable: true })
  locationId: string | null;
}
