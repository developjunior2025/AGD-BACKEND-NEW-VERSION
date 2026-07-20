import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from './provider-profile.entity';

/** provider_categories (§9.1): categorías del ecosistema (§4.3) que ofrece el proveedor. */
@Entity('provider_categories')
export class ProviderCategory extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile, (provider) => provider.categories)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Column({ name: 'category_code', type: 'varchar', length: 100 })
  categoryCode: string;

  @Column({ name: 'category_name', type: 'varchar', length: 150 })
  categoryName: string;
}
