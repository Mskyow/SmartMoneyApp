import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Subscription } from './models/subscription.model';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { User } from '../user/models/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Subscription, Watchlist, User]),
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  exports: [SubscriptionService],

})
export class SubscriptionModule {}
