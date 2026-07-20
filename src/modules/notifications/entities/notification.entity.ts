import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** notifications (§9.10): notificación interna dirigida a un usuario. */
@Entity('notifications')
export class Notification extends BaseAuditEntity {
  @Index()
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'varchar', length: 100, default: 'general' })
  type: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, unknown> | null;

  @Column({ name: 'read_at', type: 'timestamp', nullable: true })
  readAt: Date | null;
}
