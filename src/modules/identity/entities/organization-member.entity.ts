import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { MarketplaceOrganization } from './marketplace-organization.entity';
import { MarketplaceUserProfile } from './marketplace-user-profile.entity';
import { OrganizationRole } from './organization-role.entity';
import { OrganizationMemberStatus } from '../enums/organization-status.enum';

/** organization_members (§9.1): vínculo usuario-organización-rol delegado. */
@Entity('organization_members')
export class OrganizationMember extends BaseAuditEntity {
  @Index()
  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @ManyToOne(
    () => MarketplaceOrganization,
    (organization) => organization.members,
  )
  @JoinColumn({ name: 'organization_id' })
  organization: MarketplaceOrganization;

  @Index()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => MarketplaceUserProfile, (user) => user.memberships)
  @JoinColumn({ name: 'user_id' })
  user: MarketplaceUserProfile;

  @Column({ name: 'organization_role_id', type: 'uuid', nullable: true })
  organizationRoleId: string | null;

  @ManyToOne(() => OrganizationRole, (role) => role.members, { nullable: true })
  @JoinColumn({ name: 'organization_role_id' })
  organizationRole: OrganizationRole | null;

  @Column({
    type: 'enum',
    enum: OrganizationMemberStatus,
    default: OrganizationMemberStatus.INVITADO,
  })
  status: OrganizationMemberStatus;

  @Column({ name: 'invited_at', type: 'timestamp', nullable: true })
  invitedAt: Date | null;

  @Column({ name: 'joined_at', type: 'timestamp', nullable: true })
  joinedAt: Date | null;
}
