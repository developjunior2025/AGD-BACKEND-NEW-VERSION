import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { DatabaseFieldCatalog } from './database-field-catalog.entity';

/** database_table_catalog (§9.11 / §7.9-§7.10 FUR de tablas Odoo y propias). */
@Entity('database_table_catalog')
export class DatabaseTableCatalog extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'technical_name', type: 'varchar', length: 150 })
  technicalName: string;

  @Column({ name: 'functional_name', type: 'varchar', length: 200 })
  functionalName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  module: string | null;

  @Column({ type: 'text', nullable: true })
  purpose: string | null;

  @Column({ name: 'is_own_table', type: 'boolean', default: true })
  isOwnTable: boolean;

  @Column({ name: 'primary_key', type: 'varchar', length: 100, nullable: true })
  primaryKey: string | null;

  @Column({ name: 'foreign_keys', type: 'json', nullable: true })
  foreignKeys: string[] | null;

  @OneToMany(() => DatabaseFieldCatalog, (field) => field.table)
  fields: DatabaseFieldCatalog[];
}
