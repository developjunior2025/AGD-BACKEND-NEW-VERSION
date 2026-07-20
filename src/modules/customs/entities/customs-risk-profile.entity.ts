import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';
import { RiskLevel } from '../enums/customs.enums';

/** customs_risk_profiles (§9.3): perfil de riesgo del importador/exportador. */
@Entity('customs_risk_profiles')
export class CustomsRiskProfile extends BaseAuditEntity {
  @Index()
  @Column({ name: 'importer_exporter_id', type: 'uuid' })
  importerExporterId: string;

  @Column({ name: 'risk_level', type: 'enum', enum: RiskLevel })
  riskLevel: RiskLevel;

  @Column({ type: 'json', nullable: true })
  factors: Record<string, unknown> | null;

  @Column({ name: 'evaluated_at', type: 'timestamp' })
  evaluatedAt: Date;
}
