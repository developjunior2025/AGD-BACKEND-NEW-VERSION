import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FunctionalModule } from './functional-module.entity';

/** module_profiles (§9.11): perfiles habilitados para acceder a un módulo funcional. */
@Entity('module_profiles')
export class ModuleProfile extends BaseAuditEntity {
  @Index()
  @Column({ name: 'module_id', type: 'uuid' })
  moduleId: string;

  @ManyToOne(() => FunctionalModule, (module) => module.profiles)
  @JoinColumn({ name: 'module_id' })
  module: FunctionalModule;

  @Column({ name: 'profile_type', type: 'varchar', length: 100 })
  profileType: string;

  @Column({ name: 'can_access', type: 'boolean', default: true })
  canAccess: boolean;
}
