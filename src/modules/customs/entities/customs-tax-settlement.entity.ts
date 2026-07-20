import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TaxSettlementStatus } from '../enums/customs.enums';
import { CustomsTaxItem } from './customs-tax-item.entity';

/** customs_tax_settlements (§9.3 / §4.4.1 "Liquidación de tributos"). */
@Entity('customs_tax_settlements')
export class CustomsTaxSettlement extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    default: 0,
  })
  totalAmount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({
    type: 'enum',
    enum: TaxSettlementStatus,
    default: TaxSettlementStatus.PENDIENTE,
  })
  status: TaxSettlementStatus;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt: Date | null;

  @Column({
    name: 'payment_reference',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  paymentReference: string | null;

  @OneToMany(() => CustomsTaxItem, (item) => item.settlement)
  items: CustomsTaxItem[];
}
