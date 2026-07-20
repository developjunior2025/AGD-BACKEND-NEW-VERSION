import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { Promotion } from './promotion.entity';

/** promotion_services (§9.2): servicios a los que aplica la promoción. */
@Entity('promotion_services')
export class PromotionService extends BaseAuditEntity {
  @Index()
  @Column({ name: 'promotion_id', type: 'uuid' })
  promotionId: string;

  @ManyToOne(() => Promotion, (promotion) => promotion.services)
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @Column({ name: 'logistics_service_id', type: 'uuid' })
  logisticsServiceId: string;
}
