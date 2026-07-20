import { Column, Entity, Index, OneToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { LogisticsOrderStatus } from '../enums/order.enums';
import { MarketplaceContract } from './marketplace-contract.entity';

/**
 * logistics_orders (§9.2 / §4.6 paso 6): orden confirmada a partir de una
 * cotización aceptada. Punto de enlace con reviews.relatedOrderId (Fase 2).
 */
@Entity('logistics_orders')
export class LogisticsOrder extends BaseAuditEntity {
  @Column({ name: 'quote_request_id', type: 'uuid', nullable: true })
  quoteRequestId: string | null;

  @Index({ unique: true })
  @Column({ name: 'provider_quote_id', type: 'uuid', nullable: true })
  providerQuoteId: string | null;

  @Index()
  @Column({ name: 'client_id', type: 'uuid' })
  clientId: string;

  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @Column({ name: 'logistics_service_id', type: 'uuid', nullable: true })
  logisticsServiceId: string | null;

  @Column({ name: 'total_amount', type: 'decimal', precision: 14, scale: 2 })
  totalAmount: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({
    type: 'enum',
    enum: LogisticsOrderStatus,
    default: LogisticsOrderStatus.CONFIRMADA,
  })
  status: LogisticsOrderStatus;

  @Column({ name: 'confirmed_at', type: 'timestamp', nullable: true })
  confirmedAt: Date | null;

  @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @OneToOne(() => MarketplaceContract, (contract) => contract.logisticsOrder)
  contract: MarketplaceContract;
}
