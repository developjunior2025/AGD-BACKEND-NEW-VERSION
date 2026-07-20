import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DriverStatus } from '../enums/transport.enums';
import { TransportDriverCredential } from './transport-driver-credential.entity';

/** transport_drivers (§9.7 / §4.4.5 "Asignación de conductor"). */
@Entity('transport_drivers')
export class TransportDriver extends BaseAuditEntity {
  @Index()
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string | null;

  @Column({ name: 'full_name', type: 'varchar', length: 200 })
  fullName: string;

  @Column({ name: 'license_number', type: 'varchar', length: 100 })
  licenseNumber: string;

  @Column({ type: 'enum', enum: DriverStatus, default: DriverStatus.ACTIVO })
  status: DriverStatus;

  @OneToMany(() => TransportDriverCredential, (credential) => credential.driver)
  credentials: TransportDriverCredential[];
}
