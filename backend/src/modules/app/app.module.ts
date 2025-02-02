import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../../configurations/index'
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/user/models/user.model';

@Module({
  imports: [UserModule,
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
        models : [User]
       })})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
