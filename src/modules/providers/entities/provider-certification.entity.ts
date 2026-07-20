import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from './provider-profile.entity';

/** provider_certifications (§9.1). */
@Entity('provider_certifications')
export class ProviderCertification extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile, (provider) => provider.certifications)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'issued_by', type: 'varchar', length: 200, nullable: true })
  issuedBy: string | null;

  @Column({ name: 'issued_at', type: 'date', nullable: true })
  issuedAt: string | null;

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
