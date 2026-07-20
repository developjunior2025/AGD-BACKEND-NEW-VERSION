import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** trade_shipping_instructions (§9.8 / §4.4.6 "Instrucciones de despacho"). */
@Entity('trade_shipping_instructions')
export class TradeShippingInstruction extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'document_id', type: 'uuid' })
  documentId: string;

  @Column({ type: 'text' })
  instructions: string;

  @Column({ name: 'special_handling', type: 'text', nullable: true })
  specialHandling: string | null;
}
