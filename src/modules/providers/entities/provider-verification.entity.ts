import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from './provider-profile.entity';

/** provider_verifications (§9.1): historial de verificaciones del proveedor. */
@Entity('provider_verifications')
export class ProviderVerification extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Column({ name: 'verified_by', type: 'uuid' })
  verifiedBy: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  method: string | null;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
