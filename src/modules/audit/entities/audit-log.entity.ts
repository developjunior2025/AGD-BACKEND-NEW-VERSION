import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Bitácora general de acciones (§9.10 audit_logs). Trazabilidad por
 * usuario, fecha, estado y acción para toda petición mutante (§10).
 */
@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'actor_id', type: 'uuid', nullable: true })
  actorId: string | null;

  @Column({ name: 'actor_email', type: 'varchar', length: 255, nullable: true })
  actorEmail: string | null;

  @Column({ type: 'varchar', length: 50 })
  method: string;

  @Column({ type: 'varchar', length: 500 })
  path: string;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  action: string;

  @Column({ name: 'status_code', type: 'int' })
  statusCode: number;

  @Column({ name: 'ip_address', type: 'varchar', length: 100, nullable: true })
  ipAddress: string | null;

  @Column({ name: 'user_agent', type: 'varchar', length: 500, nullable: true })
  userAgent: string | null;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
