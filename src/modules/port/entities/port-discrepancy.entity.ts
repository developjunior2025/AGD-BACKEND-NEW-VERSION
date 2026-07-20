import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { PortManifestReconciliation } from './port-manifest-reconciliation.entity';
import { DiscrepancyStatus } from '../enums/port.enums';

/** port_discrepancies (§9.4 / §4.4.2 "Acta de discrepancias"). */
@Entity('port_discrepancies')
export class PortDiscrepancy extends BaseAuditEntity {
  @Index()
  @Column({ name: 'reconciliation_id', type: 'uuid' })
  reconciliationId: string;

  @ManyToOne(
    () => PortManifestReconciliation,
    (reconciliation) => reconciliation.discrepancies,
  )
  @JoinColumn({ name: 'reconciliation_id' })
  reconciliation: PortManifestReconciliation;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'resolved_status',
    type: 'enum',
    enum: DiscrepancyStatus,
    default: DiscrepancyStatus.PENDIENTE,
  })
  resolvedStatus: DiscrepancyStatus;
}
