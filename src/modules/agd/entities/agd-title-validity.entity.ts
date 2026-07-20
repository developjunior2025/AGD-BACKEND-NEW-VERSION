import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TitleStatus, TitleType } from '../enums/agd.enums';

/** agd_title_validities (§9.5 / §4.4.3 "Control de vigencia"). */
@Entity('agd_title_validities')
export class AgdTitleValidity extends BaseAuditEntity {
  @Column({ name: 'title_type', type: 'enum', enum: TitleType })
  titleType: TitleType;

  @Index()
  @Column({ name: 'title_id', type: 'uuid' })
  titleId: string;

  @Column({ name: 'valid_from', type: 'date' })
  validFrom: string;

  @Column({ name: 'valid_until', type: 'date' })
  validUntil: string;

  @Column({ type: 'enum', enum: TitleStatus, default: TitleStatus.VIGENTE })
  status: TitleStatus;
}
