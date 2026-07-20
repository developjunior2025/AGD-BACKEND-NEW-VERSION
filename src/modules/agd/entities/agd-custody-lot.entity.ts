import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { AgdReception } from './agd-reception.entity';
import { CustodyLotStatus } from '../enums/agd.enums';
import { AgdCustodyMovement } from './agd-custody-movement.entity';

/** agd_custody_lots (§9.5 / §4.4.3 "Identificación de carga o lote" y "Ubicación de almacén"). */
@Entity('agd_custody_lots')
export class AgdCustodyLot extends BaseAuditEntity {
  @Index()
  @Column({ name: 'reception_id', type: 'uuid' })
  receptionId: string;

  @ManyToOne(() => AgdReception, (reception) => reception.lots)
  @JoinColumn({ name: 'reception_id' })
  reception: AgdReception;

  @Index({ unique: true })
  @Column({ name: 'lot_code', type: 'varchar', length: 100 })
  lotCode: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'decimal', precision: 14, scale: 3, default: 0 })
  quantity: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit: string | null;

  @Column({
    name: 'warehouse_location',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  warehouseLocation: string | null;

  @Column({
    type: 'enum',
    enum: CustodyLotStatus,
    default: CustodyLotStatus.EN_CUSTODIA,
  })
  status: CustodyLotStatus;

  @OneToMany(() => AgdCustodyMovement, (movement) => movement.lot)
  movements: AgdCustodyMovement[];
}
