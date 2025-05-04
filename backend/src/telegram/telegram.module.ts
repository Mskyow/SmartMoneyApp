import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { NotificationModule } from 'src/modules/notification/notification.module';

@Module({
  imports : [NotificationModule],
  controllers: [TelegramController],
  providers: [TelegramService],
  exports:[TelegramService]
})
export class TelegramModule {}
