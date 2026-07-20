import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ContractStatus } from '../enums/order.enums';
import { LogisticsOrder } from './logistics-order.entity';
import { ContractMilestone } from './contract-milestone.entity';
import { ContractGuarantee } from './contract-guarantee.entity';

/**
 * marketplace_contracts (§9.2, regla §10: "Los contratos deberán relacionarse
 * con cotizaciones, órdenes, hitos, documentos, pagos y garantías").
 */
@Entity('marketplace_contracts')
export class MarketplaceContract extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'logistics_order_id', type: 'uuid' })
  logisticsOrderId: string;

  @OneToOne(() => LogisticsOrder, (order) => order.contract)
  @JoinColumn({ name: 'logistics_order_id' })
  logisticsOrder: LogisticsOrder;

  @Index({ unique: true })
  @Column({ name: 'contract_number', type: 'varchar', length: 100 })
  contractNumber: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate: string | null;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.BORRADOR,
  })
  status: ContractStatus;

  @Column({ name: 'terms_summary', type: 'text', nullable: true })
  termsSummary: string | null;

  @OneToMany(() => ContractMilestone, (milestone) => milestone.contract)
  milestones: ContractMilestone[];

  @OneToMany(() => ContractGuarantee, (guarantee) => guarantee.contract)
  guarantees: ContractGuarantee[];
}
