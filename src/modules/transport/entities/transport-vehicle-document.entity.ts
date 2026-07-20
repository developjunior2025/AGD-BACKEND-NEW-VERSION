import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TransportVehicle } from './transport-vehicle.entity';
import { CredentialStatus } from '../enums/transport.enums';

/** transport_vehicle_documents (§9.7 / §4.4.5 "Documentación del vehículo" y "Seguros"). */
@Entity('transport_vehicle_documents')
export class TransportVehicleDocument extends BaseAuditEntity {
  @Index()
  @Column({ name: 'vehicle_id', type: 'uuid' })
  vehicleId: string;

  @ManyToOne(() => TransportVehicle, (vehicle) => vehicle.documents)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: TransportVehicle;

  @Column({ name: 'document_type', type: 'varchar', length: 100 })
  documentType: string;

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
