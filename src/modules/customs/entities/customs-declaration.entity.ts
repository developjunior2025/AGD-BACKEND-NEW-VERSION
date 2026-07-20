import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CustomsDeclarationStatus } from '../enums/customs.enums';
import { CustomsDeclarationItem } from './customs-declaration-item.entity';

/** customs_declarations (§9.3 / §4.4.1 "Declaración de Aduanas —DA—"). */
@Entity('customs_declarations')
export class CustomsDeclaration extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Index()
  @Column({ name: 'cargo_file_id', type: 'uuid' })
  cargoFileId: string;

  @Column({ name: 'regime_id', type: 'uuid' })
  regimeId: string;

  @Column({ name: 'importer_exporter_id', type: 'uuid' })
  importerExporterId: string;

  @Index()
  @Column({ name: 'broker_id', type: 'uuid' })
  brokerId: string;

  @Column({ name: 'is_complementary', type: 'boolean', default: false })
  isComplementary: boolean;

  @Column({ name: 'parent_declaration_id', type: 'uuid', nullable: true })
  parentDeclarationId: string | null;

  @Column({
    type: 'enum',
    enum: CustomsDeclarationStatus,
    default: CustomsDeclarationStatus.BORRADOR,
  })
  status: CustomsDeclarationStatus;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  submittedAt: Date | null;

  @OneToMany(() => CustomsDeclarationItem, (item) => item.declaration)
  items: CustomsDeclarationItem[];
}
