import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Auditoría inmutable de acciones críticas (§9.10, regla §10: "Las acciones
 * críticas deberán registrarse en auditoría inmutable"). Solo inserción,
 * nunca actualización ni borrado — ver AuditService.logCritical().
 */
@Entity('immutable_audit_events')
export class ImmutableAuditEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ name: 'actor_id', type: 'uuid', nullable: true })
  actorId: string | null;

  @Column({
    name: 'actor_profile_type',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  actorProfileType: string | null;

  @Index()
  @Column({ type: 'varchar', length: 150 })
  action: string;

  @Index()
  @Column({ name: 'entity_type', type: 'varchar', length: 150 })
  entityType: string;

  @Index()
  @Column({ name: 'entity_id', type: 'varchar', length: 100, nullable: true })
  entityId: string | null;

  @Column({ name: 'before_state', type: 'json', nullable: true })
  beforeState: Record<string, unknown> | null;

  @Column({ name: 'after_state', type: 'json', nullable: true })
  afterState: Record<string, unknown> | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  reason: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;
}
