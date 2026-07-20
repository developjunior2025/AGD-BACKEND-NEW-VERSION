import { Column, Entity, Index } from 'typeorm';
import { BaseAuditEntity } from '../../../database/entities/base-audit.entity';

/** notification_preferences (§9.10): canales habilitados por usuario. */
@Entity('notification_preferences')
export class NotificationPreference extends BaseAuditEntity {
  @Index({ unique: true })
  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'email_enabled', type: 'boolean', default: true })
  emailEnabled: boolean;

  @Column({ name: 'internal_enabled', type: 'boolean', default: true })
  internalEnabled: boolean;
}
