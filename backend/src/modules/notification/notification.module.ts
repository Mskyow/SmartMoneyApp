import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from '../subscribe/models/subscription.model';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { Notification } from './models/notification.model';
import { MailService } from '../mail/mail.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/models/user.model';
import { WatchlistModule } from '../watchlist/watchlist.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Notification,User,Watchlist]), 
    MailModule
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports : [NotificationService]
})
export class NotificationModule {}
