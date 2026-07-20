import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** trade_air_waybills (§9.8 / §4.4.6 "AWB / Air Waybill"). */
@Entity('trade_air_waybills')
export class TradeAirWaybill extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @Index({ unique: true })
  @Column({ name: 'awb_number', type: 'varchar', length: 100 })
  awbNumber: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  carrier: string | null;

  @Column({
    name: 'origin_airport',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  originAirport: string | null;

  @Column({
    name: 'destination_airport',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  destinationAirport: string | null;
}
