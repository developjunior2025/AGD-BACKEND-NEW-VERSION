import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TitleStatus } from '../enums/agd.enums';

/** agd_deposit_certificates (§9.5 / §4.4.3 "Certificado de Depósito"). */
@Entity('agd_deposit_certificates')
export class AgdDepositCertificate extends BaseAuditEntity {
  @Index()
  @Column({ name: 'lot_id', type: 'uuid' })
  lotId: string;

  @Index({ unique: true })
  @Column({ name: 'certificate_number', type: 'varchar', length: 100 })
  certificateNumber: string;

  @Column({ name: 'issued_at', type: 'timestamp' })
  issuedAt: Date;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  value: string | null;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'enum', enum: TitleStatus, default: TitleStatus.VIGENTE })
  status: TitleStatus;
}
