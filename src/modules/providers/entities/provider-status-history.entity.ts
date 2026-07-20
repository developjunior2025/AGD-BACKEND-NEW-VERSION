import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from './provider-profile.entity';
import { ProviderStatus } from '../enums/provider-status.enum';

/** provider_status_history (§9.1). */
@Entity('provider_status_history')
export class ProviderStatusHistory extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Column({
    name: 'previous_status',
    type: 'enum',
    enum: ProviderStatus,
    nullable: true,
  })
  previousStatus: ProviderStatus | null;

  @Column({ name: 'new_status', type: 'enum', enum: ProviderStatus })
  newStatus: ProviderStatus;

  @Column({ name: 'changed_by', type: 'uuid', nullable: true })
  changedBy: string | null;

  @Column({ type: 'text', nullable: true })
  reason: string | null;
}
