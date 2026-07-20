import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurStatus } from '../enums/fur-status.enum';
import { FurType } from './fur-type.entity';
import { FurVersion } from './fur-version.entity';
import { FurField } from './fur-field.entity';
import { FurApproval } from './fur-approval.entity';
import { FurObservation } from './fur-observation.entity';
import { FurAttachment } from './fur-attachment.entity';

/**
 * Instancia de Ficha Única de Registro (§7). Cada FUR documenta un registro
 * de negocio concreto (usuario, proveedor, servicio, carga, etc.) mediante
 * sourceEntityType/sourceEntityId, sin acoplar el motor FUR a cada dominio.
 */
@Entity('fur_records')
export class FurRecord extends BaseAuditEntity {
  @Column({ name: 'fur_type_id', type: 'uuid' })
  furTypeId: string;

  @ManyToOne(() => FurType, (type) => type.records)
  @JoinColumn({ name: 'fur_type_id' })
  furType: FurType;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string | null;

  @Column({ type: 'int', default: 1 })
  version: number;

  @Column({ type: 'enum', enum: FurStatus, default: FurStatus.BORRADOR })
  status: FurStatus;

  @Column({ name: 'owner_id', type: 'uuid', nullable: true })
  ownerId: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  origin: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'text', nullable: true })
  objectives: string | null;

  @Column({
    name: 'source_entity_type',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  sourceEntityType: string | null;

  @Column({ name: 'source_entity_id', type: 'uuid', nullable: true })
  sourceEntityId: string | null;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt: Date | null;

  @OneToMany(() => FurVersion, (version) => version.furRecord)
  versions: FurVersion[];

  @OneToMany(() => FurField, (field) => field.furRecord)
  fields: FurField[];

  @OneToMany(() => FurApproval, (approval) => approval.furRecord)
  approvals: FurApproval[];

  @OneToMany(() => FurObservation, (observation) => observation.furRecord)
  observations: FurObservation[];

  @OneToMany(() => FurAttachment, (attachment) => attachment.furRecord)
  attachments: FurAttachment[];
}
