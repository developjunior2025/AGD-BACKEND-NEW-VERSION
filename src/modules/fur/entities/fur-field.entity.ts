import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { FurRecord } from './fur-record.entity';

/**
 * Valor de un campo específico del FUR (§7.1-§7.11 listan decenas de campos
 * por tipo). Modelo clave-valor para no requerir una tabla rígida por cada
 * uno de los 11 tipos de FUR.
 */
@Entity('fur_fields')
export class FurField extends BaseAuditEntity {
  @Index()
  @Column({ name: 'fur_record_id', type: 'uuid' })
  furRecordId: string;

  @ManyToOne(() => FurRecord, (record) => record.fields)
  @JoinColumn({ name: 'fur_record_id' })
  furRecord: FurRecord;

  @Column({ name: 'field_key', type: 'varchar', length: 150 })
  fieldKey: string;

  @Column({ name: 'field_label', type: 'varchar', length: 200, nullable: true })
  fieldLabel: string | null;

  @Column({ name: 'field_value', type: 'text', nullable: true })
  fieldValue: string | null;
}
