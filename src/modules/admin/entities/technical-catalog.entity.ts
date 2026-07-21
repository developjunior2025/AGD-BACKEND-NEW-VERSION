import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** technical_catalogs (§9.11 / §6.10 "Catálogos técnicos"): catálogos genéricos clave-valor agrupados. */
@Entity('technical_catalogs')
export class TechnicalCatalog extends BaseAuditEntity {
  @Index()
  @Column({ name: 'catalog_name', type: 'varchar', length: 150 })
  catalogName: string;

  @Column({ name: 'catalog_key', type: 'varchar', length: 150 })
  catalogKey: string;

  @Column({ name: 'catalog_value', type: 'varchar', length: 300 })
  catalogValue: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
