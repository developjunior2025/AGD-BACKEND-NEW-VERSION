import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { MarketplaceContract } from './marketplace-contract.entity';

/** contract_guarantees (§9.2): garantías asociadas al contrato. */
@Entity('contract_guarantees')
export class ContractGuarantee extends BaseAuditEntity {
  @Index()
  @Column({ name: 'contract_id', type: 'uuid' })
  contractId: string;

  @ManyToOne(() => MarketplaceContract, (contract) => contract.guarantees)
  @JoinColumn({ name: 'contract_id' })
  contract: MarketplaceContract;

  @Column({ type: 'varchar', length: 150 })
  type: string;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  amount: string | null;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ name: 'expires_at', type: 'date', nullable: true })
  expiresAt: string | null;

  @Column({
    name: 'document_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  documentUrl: string | null;
}
