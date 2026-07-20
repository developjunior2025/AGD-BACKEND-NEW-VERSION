import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ProviderProfile } from '../../providers/entities/provider-profile.entity';
import { ServiceCategory } from './service-category.entity';
import { ServiceSubcategory } from './service-subcategory.entity';
import { ServiceModality, ServiceStatus } from '../enums/service.enums';
import { ServiceScope } from './service-scope.entity';
import { ServiceRequirement } from './service-requirement.entity';
import { ServiceDeliverable } from './service-deliverable.entity';
import { ServicePricing } from './service-pricing.entity';
import { ServicePackage } from './service-package.entity';
import { ServiceAvailability } from './service-availability.entity';

/** logistics_services (§9.2 / §5.4): ficha pública de servicio del catálogo. */
@Entity('logistics_services')
export class LogisticsService extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Index()
  @Column({ name: 'provider_profile_id', type: 'uuid' })
  providerProfileId: string;

  @ManyToOne(() => ProviderProfile)
  @JoinColumn({ name: 'provider_profile_id' })
  providerProfile: ProviderProfile;

  @Index()
  @Column({ name: 'category_id', type: 'uuid' })
  categoryId: string;

  @ManyToOne(() => ServiceCategory)
  @JoinColumn({ name: 'category_id' })
  category: ServiceCategory;

  @Column({ name: 'subcategory_id', type: 'uuid', nullable: true })
  subcategoryId: string | null;

  @ManyToOne(() => ServiceSubcategory, { nullable: true })
  @JoinColumn({ name: 'subcategory_id' })
  subcategory: ServiceSubcategory | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    type: 'enum',
    enum: ServiceModality,
    default: ServiceModality.MIXTO,
  })
  modality: ServiceModality;

  @Column({ type: 'varchar', length: 200, nullable: true })
  location: string | null;

  @Column({ name: 'estimated_duration_days', type: 'int', nullable: true })
  estimatedDurationDays: number | null;

  @Column({ name: 'resources_included', type: 'text', nullable: true })
  resourcesIncluded: string | null;

  @Column({ name: 'equipment_included', type: 'text', nullable: true })
  equipmentIncluded: string | null;

  @Column({ name: 'staff_required', type: 'text', nullable: true })
  staffRequired: string | null;

  @Column({ type: 'text', nullable: true })
  conditions: string | null;

  @Column({ type: 'text', nullable: true })
  warranty: string | null;

  @Column({ type: 'json', nullable: true })
  photos: string[] | null;

  @Column({ type: 'json', nullable: true })
  videos: string[] | null;

  @Column({
    type: 'enum',
    enum: ServiceStatus,
    default: ServiceStatus.BORRADOR,
  })
  status: ServiceStatus;

  @OneToOne(() => ServiceScope, (scope) => scope.logisticsService)
  scope: ServiceScope;

  @OneToMany(
    () => ServiceRequirement,
    (requirement) => requirement.logisticsService,
  )
  requirements: ServiceRequirement[];

  @OneToMany(
    () => ServiceDeliverable,
    (deliverable) => deliverable.logisticsService,
  )
  deliverables: ServiceDeliverable[];

  @OneToMany(() => ServicePricing, (pricing) => pricing.logisticsService)
  pricing: ServicePricing[];

  @OneToMany(
    () => ServicePackage,
    (servicePackage) => servicePackage.logisticsService,
  )
  packages: ServicePackage[];

  @OneToOne(
    () => ServiceAvailability,
    (availability) => availability.logisticsService,
  )
  availability: ServiceAvailability;
}
