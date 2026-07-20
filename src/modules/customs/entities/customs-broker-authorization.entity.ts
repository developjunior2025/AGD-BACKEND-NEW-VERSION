import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { BrokerAuthorizationStatus } from '../enums/customs.enums';

/** customs_broker_authorizations (§9.3 / §4.4.1 "Autorización de auxiliar"). */
@Entity('customs_broker_authorizations')
export class CustomsBrokerAuthorization extends BaseAuditEntity {
  @Index()
  @Column({ name: 'broker_id', type: 'uuid' })
  brokerId: string;

  @Column({ name: 'authorization_number', type: 'varchar', length: 100 })
  authorizationNumber: string;

  @Column({ name: 'issued_at', type: 'date' })
  issuedAt: string;

  @Column({ name: 'expires_at', type: 'date', nullable: true })
  expiresAt: string | null;

  @Column({
    type: 'enum',
    enum: BrokerAuthorizationStatus,
    default: BrokerAuthorizationStatus.VIGENTE,
  })
  status: BrokerAuthorizationStatus;
}
