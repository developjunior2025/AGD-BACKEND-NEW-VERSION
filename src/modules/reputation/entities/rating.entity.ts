import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { Review } from './review.entity';

/** ratings (§9.2): calificación numérica (una o varias dimensiones) de una reseña. */
@Entity('ratings')
export class Rating extends BaseAuditEntity {
  @Index()
  @Column({ name: 'review_id', type: 'uuid' })
  reviewId: string;

  @ManyToOne(() => Review, (review) => review.ratings)
  @JoinColumn({ name: 'review_id' })
  review: Review;

  @Column({ type: 'varchar', length: 100, default: 'general' })
  dimension: string;

  @Column({ type: 'tinyint' })
  score: number;
}
