import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderStatus } from '../enums/provider-status.enum';
import { ProviderCategory } from './provider-category.entity';
import { ProviderSpecialty } from './provider-specialty.entity';
import { ProviderServiceArea } from './provider-service-area.entity';
import { ProviderCertification } from './provider-certification.entity';
import { ProviderLicense } from './provider-license.entity';
import { ProviderInsurance } from './provider-insurance.entity';
import { ProviderPortfolio } from './provider-portfolio.entity';

/** provider_profiles (§9.1 / §7.2): tienda digital pública del proveedor. */
@Entity('provider_profiles')
export class ProviderProfile extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'logo_url', type: 'varchar', length: 500, nullable: true })
  logoUrl: string | null;

  @Column({ name: 'cover_url', type: 'varchar', length: 500, nullable: true })
  coverUrl: string | null;

  @Column({
    type: 'enum',
    enum: ProviderStatus,
    default: ProviderStatus.PENDIENTE_VERIFICACION,
  })
  status: ProviderStatus;

  @Column({ name: 'verified_at', type: 'timestamp', nullable: true })
  verifiedAt: Date | null;

  @Column({
    name: 'rating_average',
    type: 'decimal',
    precision: 3,
    scale: 2,
    default: 0,
  })
  ratingAverage: string;

  @Column({ name: 'rating_count', type: 'int', default: 0 })
  ratingCount: number;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable: boolean;

  @OneToMany(() => ProviderCategory, (category) => category.providerProfile)
  categories: ProviderCategory[];

  @OneToMany(() => ProviderSpecialty, (specialty) => specialty.providerProfile)
  specialties: ProviderSpecialty[];

  @OneToMany(() => ProviderServiceArea, (area) => area.providerProfile)
  serviceAreas: ProviderServiceArea[];

  @OneToMany(
    () => ProviderCertification,
    (certification) => certification.providerProfile,
  )
  certifications: ProviderCertification[];

  @OneToMany(() => ProviderLicense, (license) => license.providerProfile)
  licenses: ProviderLicense[];

  @OneToMany(() => ProviderInsurance, (insurance) => insurance.providerProfile)
  insurances: ProviderInsurance[];

  @OneToMany(() => ProviderPortfolio, (portfolio) => portfolio.providerProfile)
  portfolios: ProviderPortfolio[];
}
