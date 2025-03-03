import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    UserModule,
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
        models: [User, Watchlist],
      }),
    }),
    AuthModule,
    TokenModule,
    WatchlistModule,
    BlockChainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
