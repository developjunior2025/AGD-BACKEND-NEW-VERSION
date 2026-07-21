import { Column, Entity } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** api_endpoint_catalog (§9.11): catálogo documental de endpoints expuestos. */
@Entity('api_endpoint_catalog')
export class ApiEndpointCatalog extends BaseAuditEntity {
  @Column({ type: 'varchar', length: 20 })
  method: string;

  @Column({ type: 'varchar', length: 300 })
  path: string;

  @Column({ name: 'module_id', type: 'uuid', nullable: true })
  moduleId: string | null;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ name: 'requires_auth', type: 'boolean', default: true })
  requiresAuth: boolean;

  @Column({ name: 'required_roles', type: 'json', nullable: true })
  requiredRoles: string[] | null;
}
