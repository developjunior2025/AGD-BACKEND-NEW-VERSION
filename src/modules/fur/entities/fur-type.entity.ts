import { Column, Entity, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurRecord } from './fur-record.entity';

/**
 * Catálogo de tipos de Ficha Única de Registro (§7: usuarios, proveedores,
 * servicios, cargas, documentos, ofertas, módulos, casos de uso, tablas Odoo,
 * tablas propias, matriz de gobernanza).
 */
@Entity('fur_types')
export class FurType extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  ecosystem: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => FurRecord, (record) => record.furType)
  records: FurRecord[];
}
