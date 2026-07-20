import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** transport_companies (§9.7): catálogo de transportistas/empresas. */
@Entity('transport_companies')
export class TransportCompany extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ name: 'tax_id', type: 'varchar', length: 50, nullable: true })
  taxId: string | null;

  @Column({ name: 'organization_id', type: 'uuid', nullable: true })
  organizationId: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
