import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketplaceOrganization } from './entities/marketplace-organization.entity';
import { OrganizationBranch } from './entities/organization-branch.entity';
import { OrganizationRole } from './entities/organization-role.entity';
import { OrganizationMember } from './entities/organization-member.entity';
import { OrganizationMemberStatus } from './enums/organization-status.enum';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { CreateOrganizationBranchDto } from './dto/create-organization-branch.dto';
import { CreateOrganizationRoleDto } from './dto/create-organization-role.dto';
import { InviteMemberDto } from './dto/invite-member.dto';

const OWNER_ROLE_CODE = 'owner';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(MarketplaceOrganization)
    private readonly organizationRepository: Repository<MarketplaceOrganization>,
    @InjectRepository(OrganizationBranch)
    private readonly branchRepository: Repository<OrganizationBranch>,
    @InjectRepository(OrganizationRole)
    private readonly roleRepository: Repository<OrganizationRole>,
    @InjectRepository(OrganizationMember)
    private readonly memberRepository: Repository<OrganizationMember>,
  ) {}

  async create(
    dto: CreateOrganizationDto,
    creatorUserId: string,
  ): Promise<MarketplaceOrganization> {
    const organization = await this.organizationRepository.save(
      this.organizationRepository.create(dto),
    );

    const ownerRole = await this.roleRepository.save(
      this.roleRepository.create({
        organizationId: organization.id,
        code: OWNER_ROLE_CODE,
        name: 'Propietario',
        permissions: { '*': true },
      }),
    );

    await this.memberRepository.save(
      this.memberRepository.create({
        organizationId: organization.id,
        userId: creatorUserId,
        organizationRoleId: ownerRole.id,
        status: OrganizationMemberStatus.ACTIVO,
        joinedAt: new Date(),
      }),
    );

    return organization;
  }

  findAll(): Promise<MarketplaceOrganization[]> {
    return this.organizationRepository.find({ order: { legalName: 'ASC' } });
  }

  async findOne(id: string): Promise<MarketplaceOrganization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: { branches: true, roles: true },
    });
    if (!organization) {
      throw new NotFoundException(`Organización ${id} no encontrada.`);
    }
    return organization;
  }

  async addBranch(
    organizationId: string,
    dto: CreateOrganizationBranchDto,
  ): Promise<OrganizationBranch> {
    await this.findOne(organizationId);
    return this.branchRepository.save(
      this.branchRepository.create({ ...dto, organizationId }),
    );
  }

  async addRole(
    organizationId: string,
    dto: CreateOrganizationRoleDto,
  ): Promise<OrganizationRole> {
    await this.findOne(organizationId);
    return this.roleRepository.save(
      this.roleRepository.create({
        ...dto,
        organizationId,
        permissions: dto.permissions ?? {},
      }),
    );
  }

  async inviteMember(
    organizationId: string,
    dto: InviteMemberDto,
  ): Promise<OrganizationMember> {
    await this.findOne(organizationId);
    return this.memberRepository.save(
      this.memberRepository.create({
        organizationId,
        userId: dto.userId,
        organizationRoleId: dto.organizationRoleId ?? null,
        status: OrganizationMemberStatus.INVITADO,
        invitedAt: new Date(),
      }),
    );
  }

  listMembers(organizationId: string): Promise<OrganizationMember[]> {
    return this.memberRepository.find({
      where: { organizationId },
      relations: { user: true, organizationRole: true },
    });
  }
}
