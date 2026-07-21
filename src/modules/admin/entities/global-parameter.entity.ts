import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { ParameterDataType } from '../enums/admin.enums';

/** global_parameters (§9.11 / §6.10 "Parámetros globales"). */
@Entity('global_parameters')
export class GlobalParameter extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150 })
  key: string;

  @Column({ type: 'text' })
  value: string;

  @Column({
    name: 'data_type',
    type: 'enum',
    enum: ParameterDataType,
    default: ParameterDataType.STRING,
  })
  dataType: ParameterDataType;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
