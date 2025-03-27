import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './models/notification.model';
import { MailService } from '../mail/mail.service';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { User } from '../user/models/user.model';

@Injectable()
export class NotificationService {
 
  constructor(
    @InjectModel(Notification)
    private readonly notificationModel: typeof Notification,
    @InjectModel(Watchlist)
    private readonly watchlistModel: typeof Watchlist,
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly mailService: MailService,
  ) {}

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

    if (user != null && user.email) {
     await this.mailService.sendWalletNotification(
        user.email,
        watchlist.account_name || walletAddress,
        message,
        );
    }


    // Здесь можно добавить отправку через WebSocket

    return notification;
  }
}