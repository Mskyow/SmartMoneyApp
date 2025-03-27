// src/modules/monitoring/monitoring.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MonitoringService } from './monitoring.service';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { NotificationModule } from '../notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Subscription } from '../subscribe/models/subscription.model';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forFeature([Subscription, Watchlist]),
    NotificationModule,
    RedisModule
  ],
  providers: [MonitoringService],
  exports: [MonitoringService],
})
export class MonitoringModule {}