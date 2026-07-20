import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationPreference } from './entities/notification-preference.entity';
import { NotificationsGateway } from './notifications.gateway';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';

export interface NotifyUserInput {
  userId: string;
  title: string;
  body: string;
  type?: string;
  metadata?: Record<string, unknown>;
  email?: { to: string; subject: string; html: string };
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(NotificationPreference)
    private readonly preferenceRepository: Repository<NotificationPreference>,
    private readonly mailerService: MailerService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async notifyUser(input: NotifyUserInput): Promise<Notification> {
    const preferences = await this.getOrCreatePreferences(input.userId);

    const notification = await this.notificationRepository.save(
      this.notificationRepository.create({
        userId: input.userId,
        title: input.title,
        body: input.body,
        type: input.type ?? 'general',
        metadata: input.metadata ?? null,
      }),
    );

    if (preferences.internalEnabled) {
      this.notificationsGateway.emitToUser(
        input.userId,
        'notification',
        notification,
      );
    }

    if (preferences.emailEnabled && input.email) {
      await this.sendEmail(
        input.email.to,
        input.email.subject,
        input.email.html,
      );
    }

    return notification;
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.mailerService.sendMail({ to, subject, html });
    } catch (error) {
      this.logger.error(
        `No se pudo enviar el correo a ${to}: ${(error as Error).message}`,
      );
    }
  }

  listForUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(id: string): Promise<void> {
    await this.notificationRepository.update({ id }, { readAt: new Date() });
  }

  async getOrCreatePreferences(
    userId: string,
  ): Promise<NotificationPreference> {
    let preferences = await this.preferenceRepository.findOne({
      where: { userId },
    });
    if (!preferences) {
      preferences = await this.preferenceRepository.save(
        this.preferenceRepository.create({ userId }),
      );
    }
    return preferences;
  }

  async updatePreferences(
    userId: string,
    dto: UpdateNotificationPreferencesDto,
  ): Promise<NotificationPreference> {
    const preferences = await this.getOrCreatePreferences(userId);
    Object.assign(preferences, dto);
    return this.preferenceRepository.save(preferences);
  }
}
