import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { MarketplaceOrganization } from './marketplace-organization.entity';
import { OrganizationMember } from './organization-member.entity';

/**
 * organization_roles (§9.1): roles delegados dentro de una organización
 * (regla §10: "Cada organización podrá tener usuarios internos con permisos
 * delegados"). `permissions` es un mapa clave-booleano de permisos internos.
 */
@Entity('organization_roles')
export class OrganizationRole extends BaseAuditEntity {
  @Index()
  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @ManyToOne(
    () => MarketplaceOrganization,
    (organization) => organization.roles,
  )
  @JoinColumn({ name: 'organization_id' })
  organization: MarketplaceOrganization;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'json' })
  permissions: Record<string, boolean>;

  @OneToMany(() => OrganizationMember, (member) => member.organizationRole)
  members: OrganizationMember[];
}
