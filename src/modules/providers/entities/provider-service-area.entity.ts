import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from './provider-profile.entity';

/** provider_service_areas (§9.1): zonas de cobertura del proveedor. */
@Entity('provider_service_areas')
export class ProviderServiceArea extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile, (provider) => provider.serviceAreas)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Column({ type: 'varchar', length: 100 })
  country: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  region: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  city: string | null;
}
