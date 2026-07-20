import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { OrganizationStatus } from '../enums/organization-status.enum';
import { OrganizationBranch } from './organization-branch.entity';
import { OrganizationMember } from './organization-member.entity';
import { OrganizationRole } from './organization-role.entity';

/** marketplace_organizations (§9.1): raíz multi-tenant de la plataforma. */
@Entity('marketplace_organizations')
export class MarketplaceOrganization extends BaseAuditEntity {
  @Column({ name: 'legal_name', type: 'varchar', length: 255 })
  legalName: string;

  @Column({ name: 'trade_name', type: 'varchar', length: 255, nullable: true })
  tradeName: string | null;

  @Index({ unique: true })
  @Column({ name: 'tax_id', type: 'varchar', length: 50 })
  taxId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string | null;

  @Column({
    type: 'enum',
    enum: OrganizationStatus,
    default: OrganizationStatus.PENDIENTE_VERIFICACION,
  })
  status: OrganizationStatus;

  @Column({ name: 'verified_at', type: 'timestamp', nullable: true })
  verifiedAt: Date | null;

  @OneToMany(() => OrganizationBranch, (branch) => branch.organization)
  branches: OrganizationBranch[];

  @OneToMany(() => OrganizationRole, (role) => role.organization)
  roles: OrganizationRole[];

  @OneToMany(() => OrganizationMember, (member) => member.organization)
  members: OrganizationMember[];
}
