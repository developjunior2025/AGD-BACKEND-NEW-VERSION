import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from './provider-profile.entity';

/** provider_insurances (§9.1): pólizas del proveedor. */
@Entity('provider_insurances')
export class ProviderInsurance extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile, (provider) => provider.insurances)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Column({ type: 'varchar', length: 200 })
  insurer: string;

  @Column({
    name: 'policy_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  policyNumber: string | null;

  @Column({
    name: 'coverage_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  coverageAmount: string | null;

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
