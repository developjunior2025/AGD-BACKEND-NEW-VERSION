import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** favorites (§9.2): favorito de un proveedor o de un servicio (uno de los dos). */
@Entity('favorites')
export class Favorite extends BaseAuditEntity {
  @Index()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'provider_profile_id', type: 'uuid', nullable: true })
  providerProfileId: string | null;

  @Column({ name: 'logistics_service_id', type: 'uuid', nullable: true })
  logisticsServiceId: string | null;
}
