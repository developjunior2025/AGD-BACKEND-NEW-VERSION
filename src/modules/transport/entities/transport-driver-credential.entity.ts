import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportDriver } from './transport-driver.entity';
import { CredentialStatus } from '../enums/transport.enums';

/** transport_driver_credentials (§9.7 / §4.4.5 "Licencias del conductor"). */
@Entity('transport_driver_credentials')
export class TransportDriverCredential extends BaseAuditEntity {
  @Index()
  @Column({ name: 'driver_id', type: 'uuid' })
  driverId: string;

  @ManyToOne(() => TransportDriver, (driver) => driver.credentials)
  @JoinColumn({ name: 'driver_id' })
  driver: TransportDriver;

  @Column({ name: 'credential_type', type: 'varchar', length: 100 })
  credentialType: string;

  @Column({
    name: 'document_url',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  documentUrl: string | null;

  @Column({ name: 'issued_at', type: 'date', nullable: true })
  issuedAt: string | null;

  @Column({ name: 'expires_at', type: 'date', nullable: true })
  expiresAt: string | null;

  @Column({
    type: 'enum',
    enum: CredentialStatus,
    default: CredentialStatus.VIGENTE,
  })
  status: CredentialStatus;
}
