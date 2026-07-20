import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DiscountType, PromotionStatus } from '../enums/promotion.enums';
import { PromotionService } from './promotion-service.entity';
import { PromotionCondition } from './promotion-condition.entity';

/** promotions (§9.2 / §7.6 FUR de ofertas y promociones). */
@Entity('promotions')
export class Promotion extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'discount_type', type: 'enum', enum: DiscountType })
  discountType: DiscountType;

  @Column({
    name: 'discount_value',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  discountValue: string | null;

  @Column({
    name: 'promo_price',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: true,
  })
  promoPrice: string | null;

  @Column({ name: 'valid_from', type: 'date' })
  validFrom: string;

  @Column({ name: 'valid_until', type: 'date' })
  validUntil: string;

  @Column({ name: 'max_redemptions', type: 'int', nullable: true })
  maxRedemptions: number | null;

  @Column({ name: 'redemptions_count', type: 'int', default: 0 })
  redemptionsCount: number;

  @Column({
    type: 'enum',
    enum: PromotionStatus,
    default: PromotionStatus.BORRADOR,
  })
  status: PromotionStatus;

  @OneToMany(() => PromotionService, (service) => service.promotion)
  services: PromotionService[];

  @OneToMany(() => PromotionCondition, (condition) => condition.promotion)
  conditions: PromotionCondition[];
}
