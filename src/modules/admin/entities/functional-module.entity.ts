import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FunctionalModuleStatus } from '../enums/admin.enums';
import { ModuleProfile } from './module-profile.entity';

/** functional_modules (§9.11 / §7.7 FUR de módulos funcionales). */
@Entity('functional_modules')
export class FunctionalModule extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  ecosystem: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({
    name: 'api_base_path',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  apiBasePath: string | null;

  @Column({
    type: 'enum',
    enum: FunctionalModuleStatus,
    default: FunctionalModuleStatus.ACTIVO,
  })
  status: FunctionalModuleStatus;

  @OneToMany(() => ModuleProfile, (profile) => profile.module)
  profiles: ModuleProfile[];
}
