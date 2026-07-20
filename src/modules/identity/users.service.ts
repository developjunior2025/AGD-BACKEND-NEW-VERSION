import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketplaceUserProfile } from './entities/marketplace-user-profile.entity';
import { ProfileType } from '../../common/enums/profile-type.enum';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

export interface CreateUserInput {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profileType: ProfileType;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(MarketplaceUserProfile)
    private readonly userRepository: Repository<MarketplaceUserProfile>,
  ) {}

  async create(input: CreateUserInput): Promise<MarketplaceUserProfile> {
    const existing = await this.findByEmail(input.email);
    if (existing) {
      throw new ConflictException(
        'Ya existe una cuenta registrada con este correo.',
      );
    }

    const user = this.userRepository.create({
      ...input,
      phone: input.phone ?? null,
    });
    return this.userRepository.save(user);
  }

  findByEmail(email: string): Promise<MarketplaceUserProfile | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<MarketplaceUserProfile> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario ${id} no encontrado.`);
    }
    return user;
  }

  async updateProfile(
    id: string,
    dto: UpdateUserProfileDto,
  ): Promise<MarketplaceUserProfile> {
    const user = await this.findById(id);
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async touchLastLogin(id: string): Promise<void> {
    await this.userRepository.update({ id }, { lastLoginAt: new Date() });
  }
}
