import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from './provider-profile.entity';
import { ProviderPortfolioItem } from './provider-portfolio-item.entity';

/** provider_portfolios (§9.1). */
@Entity('provider_portfolios')
export class ProviderPortfolio extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile, (provider) => provider.portfolios)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @OneToMany(() => ProviderPortfolioItem, (item) => item.providerPortfolio)
  items: ProviderPortfolioItem[];
}
