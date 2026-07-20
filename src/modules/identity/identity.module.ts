import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketplaceUserProfile } from './entities/marketplace-user-profile.entity';
import { MarketplaceOrganization } from './entities/marketplace-organization.entity';
import { OrganizationBranch } from './entities/organization-branch.entity';
import { OrganizationRole } from './entities/organization-role.entity';
import { OrganizationMember } from './entities/organization-member.entity';
import { UsersService } from './users.service';
import { OrganizationsService } from './organizations.service';
import { UsersController } from './users.controller';
import { OrganizationsController } from './organizations.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MarketplaceUserProfile,
      MarketplaceOrganization,
      OrganizationBranch,
      OrganizationRole,
      OrganizationMember,
    ]),
  ],
  controllers: [UsersController, OrganizationsController],
  providers: [UsersService, OrganizationsService],
  exports: [UsersService, OrganizationsService],
})
export class IdentityModule {}
