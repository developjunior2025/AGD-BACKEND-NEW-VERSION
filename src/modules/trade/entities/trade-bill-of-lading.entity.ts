import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** trade_bills_of_lading (§9.8 / §4.4.6 "BL / Bill of Lading"). */
@Entity('trade_bills_of_lading')
export class TradeBillOfLading extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @Index({ unique: true })
  @Column({ name: 'bl_number', type: 'varchar', length: 100 })
  blNumber: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  shipper: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  consignee: string | null;

  @Column({ type: 'varchar', length: 200, nullable: true })
  vessel: string | null;

  @Column({
    name: 'port_of_loading',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  portOfLoading: string | null;

  @Column({
    name: 'port_of_discharge',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  portOfDischarge: string | null;
}
