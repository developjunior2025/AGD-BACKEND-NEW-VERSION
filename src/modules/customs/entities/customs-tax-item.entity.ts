import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CustomsTaxSettlement } from './customs-tax-settlement.entity';

/** customs_tax_items (§9.3): renglones de la liquidación (arancel, IVA, tasas). */
@Entity('customs_tax_items')
export class CustomsTaxItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'settlement_id', type: 'uuid' })
  settlementId: string;

  @ManyToOne(() => CustomsTaxSettlement, (settlement) => settlement.items)
  @JoinColumn({ name: 'settlement_id' })
  settlement: CustomsTaxSettlement;

  @Column({ name: 'tax_type', type: 'varchar', length: 100 })
  taxType: string;

  @Column({ name: 'base_amount', type: 'decimal', precision: 14, scale: 2 })
  baseAmount: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  rate: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  amount: string;
}
