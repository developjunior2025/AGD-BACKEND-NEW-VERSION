import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TitleStatus } from '../enums/agd.enums';

/** agd_pledge_bonds (§9.5 / §4.4.3 "Bono de Prenda"). */
@Entity('agd_pledge_bonds')
export class AgdPledgeBond extends BaseAuditEntity {
  @Index()
  @Column({ name: 'lot_id', type: 'uuid' })
  lotId: string;

  @Column({ name: 'certificate_id', type: 'uuid', nullable: true })
  certificateId: string | null;

  @Index({ unique: true })
  @Column({ name: 'bond_number', type: 'varchar', length: 100 })
  bondNumber: string;

  @Column({ name: 'issued_at', type: 'timestamp' })
  issuedAt: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  value: string | null;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'enum', enum: TitleStatus, default: TitleStatus.VIGENTE })
  status: TitleStatus;
}
