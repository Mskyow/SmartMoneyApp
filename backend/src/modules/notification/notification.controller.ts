import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/getTg-bot-link')
    async getTelegramBotLink(@Req() request): Promise<string> {
        const userId : number = request.user.id;
      return await this.notificationService.generateTelegramLink(userId);
    }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-tg-notification')
  async updateTelegramNotification(
    @Body() body ,
    @Req() request): Promise<{ success: boolean, telegramId?: string }> {
        const userId : number = request.user.id;
        console.log(userId)
        const isEnabled = body.enabled;
      return await this.notificationService.updateTelegramNotification(userId,isEnabled);
    }
}


