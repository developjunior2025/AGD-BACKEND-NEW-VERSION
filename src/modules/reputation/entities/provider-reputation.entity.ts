import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** provider_reputation (§9.2): agregado recalculado a partir de ratings/reviews. */
@Entity('provider_reputation')
export class ProviderReputation extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @Column({
    name: 'average_score',
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  averageScore: string;

  @Column({ name: 'total_reviews', type: 'int', default: 0 })
  totalReviews: number;

  @Column({
    name: 'response_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  responseRate: string | null;

  @Column({ name: 'recalculated_at', type: 'timestamp', nullable: true })
  recalculatedAt: Date | null;
}
