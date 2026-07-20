import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { VehicleStatus } from '../enums/transport.enums';
import { TransportVehicleDocument } from './transport-vehicle-document.entity';

/** transport_vehicles (§9.7 / §4.4.5 "Asignación de unidad"). */
@Entity('transport_vehicles')
export class TransportVehicle extends BaseAuditEntity {
  @Index()
  @Column({ name: 'company_id', type: 'uuid' })
  companyId: string;

  @Index({ unique: true })
  @Column({ name: 'plate_number', type: 'varchar', length: 50 })
  plateNumber: string;

  @Column({
    name: 'vehicle_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  vehicleType: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  capacity: string | null;

  @Column({
    type: 'enum',
    enum: VehicleStatus,
    default: VehicleStatus.DISPONIBLE,
  })
  status: VehicleStatus;

  @OneToMany(() => TransportVehicleDocument, (document) => document.vehicle)
  documents: TransportVehicleDocument[];
}
