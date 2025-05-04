import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { NotificationService } from 'src/modules/notification/notification.service';

@Injectable()
export class TelegramService {
    private readonly logger = new Logger(TelegramService.name);
    private telegramBot: TelegramBot;
  
    constructor(
      private readonly notificationService: NotificationService,
      private readonly configService: ConfigService,
    ) {
      const token = this.configService.get<string>('telegram_bot_token');
      if (token) {
        this.telegramBot = new TelegramBot(token,{
          polling : {
              interval : 300,
              autoStart : true,
              params: {
                  timeout: 30     
              }
          }
      });
        this.telegramBot.on('message', (msg) => this.handleMessage(msg)); 
        this.logger.log('Telegram message handler initialized');
      } else {
        this.logger.error('Telegram bot token is not defined. Telegram message handler will not work.');
      }
    }
  
    private async handleMessage(msg: TelegramBot.Message) {
      const chatId = msg.chat.id.toString();
      const text = msg.text;
      const userId = msg.from?.id;
  
      this.logger.debug(`Received message from chat ${chatId}: ${text}`);
  
      if (!text) {
        await this.telegramBot.sendMessage(chatId, 'Пожалуйста, отправьте текстовое сообщение.');
        return;
      }
  
      if (text.startsWith('/start ')) {
        await this.handleStartCommand(chatId, text);
        return;
      }
  
    //   if (text.startsWith('/code ')) {
    //     await this.handleCodeCommand(chatId, text);
    //     return;
    //   }
  
        if (userId) {
            await this.telegramBot.sendMessage(chatId, `Я получил ваше сообщение: "${text}".  Я обрабатываю только команды /start`);
        } else {
             await this.telegramBot.sendMessage(chatId, `Я получил ваше сообщение: "${text}".  Я обрабатываю только команды /start`);
        }
  
  
    }
  
    private async handleStartCommand(chatId: string, text: string) {
      const token = text.split(' ')[1]; // Извлекаем токен из команды
      if (!token) {
        await this.telegramBot.sendMessage(chatId, 'Неверная команда /start. Пожалуйста, предоставьте токен.');
        return;
      }
      const userId = await this.notificationService.validateTelegramToken(token, chatId);
      if (userId) {
        await this.telegramBot.sendMessage(chatId, 'Ваш аккаунт Telegram успешно связан!');
        this.logger.log(`Telegram аккаунт связан для пользователя ${userId} с chat ID ${chatId}`);
      } else {
        await this.telegramBot.sendMessage(
          chatId,
          'Неверный или истекший токен. Пожалуйста, попробуйте снова в приложении.',
        );
        this.logger.warn(`Не удалось связать Telegram аккаунт с токеном: ${token}`);
      }
    }
  
    //   private async handleCodeCommand(chatId: string, text: string) {
    //   const code = text.split(' ')[1]; // Extract the code from the command
    //   if (!code) {
    //     await this.telegramBot.sendMessage(chatId, 'Неверная команда /code.  Пожалуйста, предоставьте код.');
    //     return;
    //   }
  
    //   //  Здесь должна быть логика для проверки кода и связывания аккаунта,
    //   //  аналогично  validateTelegramLink, но с использованием кода подтверждения.
    //   //  Вам нужно будет создать метод в NotificationService (или новом сервисе)
    //   //  для проверки кода и обновления telegramId пользователя.
    //   const userId = await this.notificationService.validateTelegramCode(code, chatId); // Пример вызова
  
    //   if (userId) {
    //     await this.telegramBot.sendMessage(chatId, 'Ваш аккаунт Telegram успешно связан!');
    //     this.logger.log(`Telegram account linked for user ${userId} with chat ID ${chatId}`);
    //   } else {
    //     await this.telegramBot.sendMessage(
    //       chatId,
    //       'Неверный или истекший код. Пожалуйста, попробуйте снова в приложении.',
    //     );
    //     this.logger.warn(`Failed to link Telegram account with code: ${code}`);
    //   }
    // }
  }
