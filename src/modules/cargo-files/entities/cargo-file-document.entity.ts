import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CargoFile } from './cargo-file.entity';

/** cargo_file_documents (§9.9): documentos asociados al expediente (regla §10). */
@Entity('cargo_file_documents')
export class CargoFileDocument extends BaseAuditEntity {
  @Index()
  @Column({ name: 'cargo_file_id', type: 'uuid' })
  cargoFileId: string;

  @ManyToOne(() => CargoFile, (cargoFile) => cargoFile.documents)
  @JoinColumn({ name: 'cargo_file_id' })
  cargoFile: CargoFile;

  @Index()
  @Column({ name: 'document_instance_id', type: 'uuid' })
  documentInstanceId: string;

  @Column({ name: 'is_required', type: 'boolean', default: true })
  isRequired: boolean;
}
