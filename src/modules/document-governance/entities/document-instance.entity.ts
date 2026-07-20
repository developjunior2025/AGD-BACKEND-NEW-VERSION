import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurStatus } from '../../fur/enums/fur-status.enum';
import { DocumentType } from './document-type.entity';
import { DocumentVersion } from './document-version.entity';
import { DocumentApproval } from './document-approval.entity';
import { DocumentSignature } from './document-signature.entity';
import { DocumentObservation } from './document-observation.entity';

/**
 * document_instances (§9.9): documento real generado a partir de un tipo /
 * plantilla, asociable a cualquier entidad de negocio (carga, orden, etc.)
 * mediante sourceEntityType/sourceEntityId — mismo patrón que fur_records.
 */
@Entity('document_instances')
export class DocumentInstance extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_type_id', type: 'uuid' })
  documentTypeId: string;

  @ManyToOne(() => DocumentType)
  @JoinColumn({ name: 'document_type_id' })
  documentType: DocumentType;

  @Column({ name: 'template_id', type: 'uuid', nullable: true })
  templateId: string | null;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'owner_id', type: 'uuid', nullable: true })
  ownerId: string | null;

  @Column({
    name: 'source_entity_type',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  sourceEntityType: string | null;

  @Column({ name: 'source_entity_id', type: 'uuid', nullable: true })
  sourceEntityId: string | null;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'enum', enum: FurStatus, default: FurStatus.BORRADOR })
  status: FurStatus;

  @Column({ name: 'file_url', type: 'varchar', length: 500, nullable: true })
  fileUrl: string | null;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  @OneToMany(() => DocumentVersion, (version) => version.documentInstance)
  versions: DocumentVersion[];

  @OneToMany(() => DocumentApproval, (approval) => approval.documentInstance)
  approvals: DocumentApproval[];

  @OneToMany(() => DocumentSignature, (signature) => signature.documentInstance)
  signatures: DocumentSignature[];

  @OneToMany(
    () => DocumentObservation,
    (observation) => observation.documentInstance,
  )
  observations: DocumentObservation[];
}
