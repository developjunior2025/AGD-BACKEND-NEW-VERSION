import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** document_retention_rules (§9.9, regla §10: "Los catálogos maestros deberán versionarse" / retención documental). */
@Entity('document_retention_rules')
export class DocumentRetentionRule extends BaseAuditEntity {
  @Index()
  @Column({ name: 'document_type_id', type: 'uuid' })
  documentTypeId: string;

  @Column({ name: 'retention_period_months', type: 'int', nullable: true })
  retentionPeriodMonths: number | null;

  @Column({ name: 'is_permanent', type: 'boolean', default: false })
  isPermanent: boolean;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
