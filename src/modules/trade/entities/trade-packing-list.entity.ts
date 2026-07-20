import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TradePackingListItem } from './trade-packing-list-item.entity';

/** trade_packing_lists (§9.8 / §4.4.6 "Packing List"). */
@Entity('trade_packing_lists')
export class TradePackingList extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @Column({ name: 'total_packages', type: 'int', nullable: true })
  totalPackages: number | null;

  @Column({
    name: 'total_weight',
    type: 'decimal',
    precision: 14,
    scale: 3,
    nullable: true,
  })
  totalWeight: string | null;

  @Column({
    name: 'total_volume',
    type: 'decimal',
    precision: 14,
    scale: 3,
    nullable: true,
  })
  totalVolume: string | null;

  @OneToMany(() => TradePackingListItem, (item) => item.packingList)
  items: TradePackingListItem[];
}
