import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderPortfolio } from './provider-portfolio.entity';

/** provider_portfolio_items (§9.1): evidencias/casos dentro de un portafolio. */
@Entity('provider_portfolio_items')
export class ProviderPortfolioItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_portfolio_id', type: 'uuid' })
  providerPortfolioId: string;

  @ManyToOne(() => ProviderPortfolio, (portfolio) => portfolio.items)
  @JoinColumn({ name: 'provider_portfolio_id' })
  providerPortfolio: ProviderPortfolio;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'media_url', type: 'varchar', length: 500, nullable: true })
  mediaUrl: string | null;
}
