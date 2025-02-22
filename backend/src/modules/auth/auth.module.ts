import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from '../../strategy/index'; // Убедись, что путь правильный

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  imports: [
    UserModule,
    TokenModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // Получаем секрет из .env
      signOptions: { expiresIn: '1h' }, // Время жизни токена
    }),
  ],
  exports: [JwtModule], // Экспортируем JwtModule, если он нужен в других модулях
})
export class AuthModule {}
