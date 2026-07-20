import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TitleType } from '../enums/agd.enums';

/** agd_title_endorsements (§9.5 / §4.4.3 "Historial de endosos"). */
@Entity('agd_title_endorsements')
export class AgdTitleEndorsement extends BaseAuditEntity {
  @Column({ name: 'title_type', type: 'enum', enum: TitleType })
  titleType: TitleType;

  @Index()
  @Column({ name: 'title_id', type: 'uuid' })
  titleId: string;

  @Column({ name: 'endorsed_by', type: 'uuid' })
  endorsedBy: string;

  @Column({ name: 'endorsed_to', type: 'uuid' })
  endorsedTo: string;

  @Column({ name: 'endorsed_at', type: 'timestamp' })
  endorsedAt: Date;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
