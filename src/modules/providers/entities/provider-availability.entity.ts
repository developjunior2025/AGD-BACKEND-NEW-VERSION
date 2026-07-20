import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from './provider-profile.entity';

/** provider_availability (§9.1): franja de disponibilidad declarada por el proveedor. */
@Entity('provider_availability')
export class ProviderAvailability extends BaseAuditEntity {
  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Column({ name: 'day_of_week', type: 'tinyint' })
  dayOfWeek: number;

  @Column({ name: 'start_time', type: 'time' })
  startTime: string;

  @Column({ name: 'end_time', type: 'time' })
  endTime: string;
}
