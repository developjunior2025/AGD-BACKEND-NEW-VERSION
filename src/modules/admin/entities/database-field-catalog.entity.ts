import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DatabaseTableCatalog } from './database-table-catalog.entity';

/** database_field_catalog (§9.11): campos documentados de cada tabla del catálogo. */
@Entity('database_field_catalog')
export class DatabaseFieldCatalog extends BaseAuditEntity {
  @Index()
  @Column({ name: 'table_id', type: 'uuid' })
  tableId: string;

  @ManyToOne(() => DatabaseTableCatalog, (table) => table.fields)
  @JoinColumn({ name: 'table_id' })
  table: DatabaseTableCatalog;

  @Column({ name: 'field_name', type: 'varchar', length: 150 })
  fieldName: string;

  @Column({ name: 'data_type', type: 'varchar', length: 100 })
  dataType: string;

  @Column({ name: 'is_required', type: 'boolean', default: false })
  isRequired: boolean;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
