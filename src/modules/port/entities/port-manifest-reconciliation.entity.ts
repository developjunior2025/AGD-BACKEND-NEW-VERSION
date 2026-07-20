import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ReconciliationStatus } from '../enums/port.enums';
import { PortDiscrepancy } from './port-discrepancy.entity';

/** port_manifest_reconciliations (§9.4 / §4.4.2 "Conciliación de manifiesto"). */
@Entity('port_manifest_reconciliations')
export class PortManifestReconciliation extends BaseAuditEntity {
  @Index()
  @Column({ name: 'manifest_id', type: 'uuid' })
  manifestId: string;

  @Column({ name: 'reconciled_by', type: 'uuid' })
  reconciledBy: string;

  @Column({ name: 'reconciled_at', type: 'timestamp' })
  reconciledAt: Date;

  @Column({ type: 'enum', enum: ReconciliationStatus })
  status: ReconciliationStatus;

  @Column({ type: 'text', nullable: true })
  notes: string | null;

  @OneToMany(() => PortDiscrepancy, (discrepancy) => discrepancy.reconciliation)
  discrepancies: PortDiscrepancy[];
}
