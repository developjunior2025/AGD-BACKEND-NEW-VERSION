import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { CustomsDeclaration } from './customs-declaration.entity';

/** customs_declaration_items (§9.3): renglones de mercancía de la declaración. */
@Entity('customs_declaration_items')
export class CustomsDeclarationItem extends BaseAuditEntity {
  @Index()
  @Column({ name: 'declaration_id', type: 'uuid' })
  declarationId: string;

  @ManyToOne(() => CustomsDeclaration, (declaration) => declaration.items)
  @JoinColumn({ name: 'declaration_id' })
  declaration: CustomsDeclaration;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ name: 'tariff_classification_id', type: 'uuid', nullable: true })
  tariffClassificationId: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 3, default: 1 })
  quantity: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 3, nullable: true })
  weight: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true })
  value: string | null;

  @Column({
    name: 'origin_country',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  originCountry: string | null;
}
