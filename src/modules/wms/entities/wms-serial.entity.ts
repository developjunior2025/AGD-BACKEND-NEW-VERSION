import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { SerialStatus } from '../enums/wms.enums';

/** wms_serials (§9.6 / §4.4.4 "Lotes y series"). */
@Entity('wms_serials')
export class WmsSerial extends BaseAuditEntity {
  @Index()
  @Column({ name: 'sku_id', type: 'uuid' })
  skuId: string;

  @Column({ name: 'lot_id', type: 'uuid', nullable: true })
  lotId: string | null;

  @Index({ unique: true })
  @Column({ name: 'serial_number', type: 'varchar', length: 150 })
  serialNumber: string;

  @Column({ type: 'enum', enum: SerialStatus, default: SerialStatus.EN_STOCK })
  status: SerialStatus;
}
