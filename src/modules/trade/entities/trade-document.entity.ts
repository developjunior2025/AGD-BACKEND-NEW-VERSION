import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { TradeDocumentStatus, TradeDocumentType } from '../enums/trade.enums';

/**
 * trade_documents (§9.8): cabecera común de todos los documentos comerciales
 * — cada tabla trade_* específica cuelga de un registro aquí vía documentId.
 */
@Entity('trade_documents')
export class TradeDocument extends BaseAuditEntity {
  @Column({ name: 'document_type', type: 'enum', enum: TradeDocumentType })
  documentType: TradeDocumentType;

  @Column({ name: 'cargo_file_id', type: 'uuid', nullable: true })
  cargoFileId: string | null;

  @Column({ name: 'order_id', type: 'uuid', nullable: true })
  orderId: string | null;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ name: 'issued_at', type: 'timestamp', nullable: true })
  issuedAt: Date | null;

  @Column({
    type: 'enum',
    enum: TradeDocumentStatus,
    default: TradeDocumentStatus.BORRADOR,
  })
  status: TradeDocumentStatus;
}
