import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProfileType } from '../../../common/enums/profile-type.enum';
import { UserStatus } from '../enums/user-status.enum';
import { OrganizationMember } from './organization-member.entity';

/**
 * marketplace_user_profiles (§9.1 / §7.1 FUR de usuarios). Combina
 * credenciales e identidad — es la tabla que consulta AuthService.
 */
@Entity('marketplace_user_profiles')
export class MarketplaceUserProfile extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ name: 'first_name', type: 'varchar', length: 150 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 150 })
  lastName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string | null;

  @Column({ name: 'profile_type', type: 'enum', enum: ProfileType })
  profileType: ProfileType;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.PENDIENTE_VERIFICACION,
  })
  status: UserStatus;

  @Column({ name: 'email_verified_at', type: 'timestamp', nullable: true })
  emailVerifiedAt: Date | null;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt: Date | null;

  @OneToMany(() => OrganizationMember, (member) => member.user)
  memberships: OrganizationMember[];
}
