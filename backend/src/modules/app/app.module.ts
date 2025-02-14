import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../configurations/index'
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
    ConfigModule.forRoot({isGlobal: true, load:[config]}),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService)=>({ 
        dialect: "postgres", 
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database : configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models : [User, Watchlist]
       })}),
    AuthModule,
    TokenModule,
    WatchlistModule,
    BlockChainModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
