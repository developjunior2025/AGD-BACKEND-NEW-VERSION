import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { SelectivityChannel } from '../enums/customs.enums';

/** customs_selectivity_channels (§9.3 / §4.4.1 "Canal de selectividad"). */
@Entity('customs_selectivity_channels')
export class CustomsSelectivityChannel extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @Column({ type: 'enum', enum: SelectivityChannel })
  channel: SelectivityChannel;

  @Column({ name: 'assigned_at', type: 'timestamp' })
  assignedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
