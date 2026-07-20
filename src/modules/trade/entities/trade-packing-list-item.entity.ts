import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TradePackingList } from './trade-packing-list.entity';

/** trade_packing_list_items (§9.8 / §4.4.6 "Relación de bultos"). */
@Entity('trade_packing_list_items')
export class TradePackingListItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'packing_list_id', type: 'uuid' })
  packingListId: string;

  @ManyToOne(() => TradePackingList, (packingList) => packingList.items)
  @JoinColumn({ name: 'packing_list_id' })
  packingList: TradePackingList;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({
    name: 'package_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  packageType: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 3, default: 1 })
  quantity: string;

  @Column({ type: 'decimal', precision: 14, scale: 3, nullable: true })
  weight: string | null;
}
