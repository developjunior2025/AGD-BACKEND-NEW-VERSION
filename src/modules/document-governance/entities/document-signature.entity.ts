import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DocumentInstance } from './document-instance.entity';

/** document_signatures (§9.9 / §4.5.1 "Firmas"). */
@Entity('document_signatures')
export class DocumentSignature extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_instance_id', type: 'uuid' })
  documentInstanceId: string;

  @ManyToOne(() => DocumentInstance, (instance) => instance.signatures)
  @JoinColumn({ name: 'document_instance_id' })
  documentInstance: DocumentInstance;

  @Column({ name: 'signer_id', type: 'uuid' })
  signerId: string;

  @Column({ name: 'signed_at', type: 'timestamp' })
  signedAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  method: string | null;

  @Column({
    name: 'signature_reference',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  signatureReference: string | null;
}
