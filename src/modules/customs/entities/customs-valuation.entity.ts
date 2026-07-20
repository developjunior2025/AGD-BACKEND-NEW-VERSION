import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** customs_valuations (§9.3 / §4.4.1 "Valoración aduanera"). */
@Entity('customs_valuations')
export class CustomsValuation extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @Column({ type: 'varchar', length: 150 })
  method: string;

  @Column({ name: 'declared_value', type: 'decimal', precision: 14, scale: 2 })
  declaredValue: string;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'json', nullable: true })
  adjustments: Record<string, unknown> | null;

  @Column({ name: 'total_value', type: 'decimal', precision: 14, scale: 2 })
  totalValue: string;
}
