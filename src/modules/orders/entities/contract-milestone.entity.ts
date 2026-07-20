import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { MarketplaceContract } from './marketplace-contract.entity';
import { MilestoneStatus } from '../enums/order.enums';

/** contract_milestones (§9.2). */
@Entity('contract_milestones')
export class ContractMilestone extends BaseAuditEntity {
  @Index()
  @Column({ name: 'contract_id', type: 'uuid' })
  contractId: string;

  @ManyToOne(() => MarketplaceContract, (contract) => contract.milestones)
  @JoinColumn({ name: 'contract_id' })
  contract: MarketplaceContract;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate: string | null;

  @Column({
    type: 'enum',
    enum: MilestoneStatus,
    default: MilestoneStatus.PENDIENTE,
  })
  status: MilestoneStatus;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date | null;
}
