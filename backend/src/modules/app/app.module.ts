import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../configurations/index';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/user/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { WatchlistModule } from '../watchlist/watchlist.module';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { BlockChainModule } from 'src/modules/block-chain/block-chain.module';
import { Subscription } from '../subscribe/models/subscription.model';
import { Notification } from '../notification/models/notification.model';
import { SubscriptionModule } from '../subscribe/subscription.module';
import { MonitoringService } from '../monitoring/monitoring.service';
import { RedisModule } from '../redis/redis.module';
import { MonitoringModule } from '../monitoring/monitoring.module';
import { MailModule } from '../mail/mail.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    UserModule,
    NotificationModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('db_host') || 'localhost',
        port: configService.get<number>('db_port') || 5432,
        username: configService.get<string>('db_user') || 'postgres',
        password: configService.get<string>('db_password') || 'password',
        database: configService.get<string>('db_name') || 'mydatabase',
        autoLoadModels: true,
        models: [User, Watchlist,Subscription,Notification],
      }),
    }),
    AuthModule,
    TokenModule,
    WatchlistModule,
    BlockChainModule,
    SubscriptionModule,
    RedisModule,
    MonitoringModule,
    MailModule,

    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly monitoringService: MonitoringService) {}
  private readonly logger = new Logger(AppModule.name);

  async onModuleInit() { 
      try {
        this.logger.log('Starting monitoring service...');
        await this.monitoringService.startMonitoring();
        this.logger.log('Monitoring service started successfully');
      } catch (error) {
        this.logger.error('Failed to start monitoring service', error.stack);
        process.exit(1); // Завершаем процесс при критической ошибке
      }
  }
}