import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { WmsDispatchOrder } from './wms-dispatch-order.entity';

/**
 * wms_dispatch_evidence (§9.6 / §4.4.4 "Confirmación de carga", "Registro de
 * salida" y "Evidencia de entrega al siguiente actor").
 */
@Entity('wms_dispatch_evidence')
export class WmsDispatchEvidence extends BaseAuditEntity {
  @Index()
  @Column({ name: 'dispatch_order_id', type: 'uuid' })
  dispatchOrderId: string;

  @ManyToOne(() => WmsDispatchOrder, (order) => order.evidence)
  @JoinColumn({ name: 'dispatch_order_id' })
  dispatchOrder: WmsDispatchOrder;

  @Column({ name: 'evidence_url', type: 'varchar', length: 500 })
  evidenceUrl: string;

  @Column({ name: 'uploaded_by', type: 'uuid' })
  uploadedBy: string;

  @Column({ type: 'text', nullable: true })
  notes: string | null;
}
