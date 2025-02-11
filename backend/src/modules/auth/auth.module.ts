import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { JWTStrategy } from 'src/strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JWTStrategy],
  imports: [UserModule,TokenModule]
})
export class AuthModule {}
