import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ReceiptStatus } from '../enums/wms.enums';
import { WmsReceiptItem } from './wms-receipt-item.entity';

/** wms_receipts (§9.6 / §4.4.4 "Orden de recepción" y "Aviso de arribo"). */
@Entity('wms_receipts')
export class WmsReceipt extends BaseAuditEntity {
  @Index()
  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @Index({ unique: true })
  @Column({ name: 'receipt_number', type: 'varchar', length: 100 })
  receiptNumber: string;

  @Column({ name: 'expected_at', type: 'timestamp', nullable: true })
  expectedAt: Date | null;

  @Column({ name: 'received_at', type: 'timestamp', nullable: true })
  receivedAt: Date | null;

  @Column({
    type: 'enum',
    enum: ReceiptStatus,
    default: ReceiptStatus.PENDIENTE,
  })
  status: ReceiptStatus;

  @OneToMany(() => WmsReceiptItem, (item) => item.receipt)
  items: WmsReceiptItem[];
}
