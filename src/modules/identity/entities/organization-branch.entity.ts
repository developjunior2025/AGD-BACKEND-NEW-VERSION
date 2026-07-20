import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { MarketplaceOrganization } from './marketplace-organization.entity';

/** organization_branches (§9.1): sedes/sucursales de una organización. */
@Entity('organization_branches')
export class OrganizationBranch extends BaseAuditEntity {
  @Index()
  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @ManyToOne(
    () => MarketplaceOrganization,
    (organization) => organization.branches,
  )
  @JoinColumn({ name: 'organization_id' })
  organization: MarketplaceOrganization;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address: string | null;

  @Column({ type: 'varchar', length: 150, nullable: true })
  city: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string | null;

  @Column({ name: 'is_main', type: 'boolean', default: false })
  isMain: boolean;
}
