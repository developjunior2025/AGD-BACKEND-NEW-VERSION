import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { Rating } from './rating.entity';

export enum ReviewStatus {
  PUBLICADA = 'publicada',
  OCULTA = 'oculta',
}

/**
 * reviews (§9.2). Regla §10: "Las reseñas verificadas deberán relacionarse
 * con una contratación u orden real" — relatedOrderId queda como referencia
 * libre hasta que exista logistics_orders (Fase 3); is_verified solo se
 * marca true cuando esa referencia está presente.
 */
@Entity('reviews')
export class Review extends BaseAuditEntity {
  @Index()
  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @Column({ type: 'text' })
  comment: string;

  @Column({ name: 'related_order_id', type: 'uuid', nullable: true })
  relatedOrderId: string | null;

  @Column({ name: 'is_verified', type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'enum', enum: ReviewStatus, default: ReviewStatus.PUBLICADA })
  status: ReviewStatus;

  @OneToMany(() => Rating, (rating) => rating.review)
  ratings: Rating[];
}
