import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** customs_tariff_classifications (§9.3): partidas arancelarias (HS code). */
@Entity('customs_tariff_classifications')
export class CustomsTariffClassification extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({
    name: 'duty_rate',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  dutyRate: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
