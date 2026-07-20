import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** trade_certificates_of_origin (§9.8 / §4.4.6 "Certificado de origen"). */
@Entity('trade_certificates_of_origin')
export class TradeCertificateOfOrigin extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @Index({ unique: true })
  @Column({ name: 'certificate_number', type: 'varchar', length: 100 })
  certificateNumber: string;

  @Column({ name: 'origin_country', type: 'varchar', length: 100 })
  originCountry: string;

  @Column({ name: 'issued_by', type: 'varchar', length: 200, nullable: true })
  issuedBy: string | null;
}
