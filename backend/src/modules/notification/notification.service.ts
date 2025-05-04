import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './models/notification.model';
import { MailService } from '../mail/mail.service';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { User } from '../user/models/user.model';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api'; 
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'; // Import Cache

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private telegramBot: TelegramBot;
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
    @InjectModel(Watchlist)
    private readonly watchlistModel: typeof Watchlist,
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache, 
    private readonly configService : ConfigService
  ) {
    const telegramToken = configService.get<string>('telegram_bot_token') ;
    if (telegramToken) {
      this.telegramBot = new TelegramBot(telegramToken, { polling: false }); 
      this.logger.log('Telegram bot initialized');
    } else {
      this.logger.warn('Telegram bot token is not defined. Telegram notifications will be disabled.');
    }
  }

  async createNotification(data: {
    userId: number;
    walletAddress: string;
    type: string;
    message: string;
    metadata?: any;
  }) {
    const { userId, walletAddress, type, message, metadata } = data;

    const user = await this.userModel.findByPk(userId);
    const watchlist = await this.watchlistModel.findOne({
      where: { account_address: walletAddress, userId },
    });

    if (!watchlist) return;

    // Создаем запись уведомления
    const notification = await this.notificationModel.create({
      userId,
      watchlistId: watchlist.id,
      type,
      message,
      metadata,
      triggeredAt: new Date(),
    });

    if (user != null && user.email && user.emailNotify) {
      try {
     await this.mailService.sendWalletNotification(
        user.email,
        watchlist.account_name || walletAddress,
        message,
        );
      } catch (error) {
        this.logger.error(`Failed to send Mail notification to user ${userId}:`,error);
      }
    }

    if (user && user.telegramId && user.telegramNotify) {
      try {
        await this.sendTelegramNotification(user.telegramId, message);
        await notification.update({ telegramSent: true }); 
      } catch (error) {
        this.logger.error(`Failed to send Telegram notification to user ${userId}:`,error);
      }
    }

    // Здесь можно добавить отправку через WebSocket

    return notification;
  }

  private async sendTelegramNotification(chatId: string, message: string) {
    if (!this.telegramBot) {
      this.logger.warn('Telegram bot is not initialized. Skipping notification.');
      return;
    }
    await this.telegramBot.sendMessage(chatId, message);
  }

  async generateTelegramLink(userId: number): Promise<string> {
    const user = await this.userModel.findByPk(userId);
    
    // Генерируем ссылку только если уведомления включены
    if (!user || !user.telegramNotify) {
      return '';
    }

    // Если уже есть telegramId - возвращаем пустую строку
    if (user.telegramId) {
      return '';
    }

    const token = crypto.randomUUID().toString();
    const expiresAt = 60000; // миллисекунды
    await this.cacheManager.set(`telegram_token:${token}`, userId.toString(), expiresAt);
    return `https://t.me/${this.configService.get('TELEGRAM_BOT_USERNAME')}?start=${token}`;
  }

  
  async validateTelegramToken(token: string, chatId: string): Promise<number | null> {
    const userIdString = await this.cacheManager.get(`telegram_token:${token}`);
    if (!userIdString) {
      return null;
    }
    const userId = parseInt(userIdString.toString(), 10);
    await this.userModel.update({ telegramId: chatId }, { where: { id: userId } });
    await this.cacheManager.del(`telegram_token:${token}`);
    return userId;
  }
  async updateTelegramNotification(
    userId: number, 
    isEnabled: boolean
  ): Promise<{ success: boolean, telegramId?: string }> {
    const user = await this.userModel.findByPk(userId);
    
    if (!user) {
      return { success: false };
    }

    // Обновляем только если состояние изменилось
    if (user.telegramNotify !== isEnabled) {
      await user.update({ telegramNotify: isEnabled });
    }

    return { 
      success: true,
      telegramId: user.telegramId || undefined
    };
  }
}