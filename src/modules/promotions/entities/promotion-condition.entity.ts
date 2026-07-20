import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { Promotion } from './promotion.entity';

/** promotion_conditions (§9.2): condiciones de aplicación de la promoción. */
@Entity('promotion_conditions')
export class PromotionCondition extends BaseAuditEntity {
  @Index()
  @Column({ name: 'promotion_id', type: 'uuid' })
  promotionId: string;

  @ManyToOne(() => Promotion, (promotion) => promotion.conditions)
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @Column({ type: 'varchar', length: 300 })
  description: string;
}
