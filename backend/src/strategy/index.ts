import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/constants/errors';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    const secret: string | undefined = configService.get<string>('secret_jwt');
    if (!secret) throw new BadRequestException(AppError.JWT_SECRET_UNDEFINED);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: string }) {
    console.log(payload);
    console.log('payload check str');
    const userId = payload.sub;
    if (!userId) {
      throw new BadRequestException(AppError.JWT_AUNTIFICATION_FAILED);
    }
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new BadRequestException('Auntefication Error. User not found');
    }

    return user.dataValues;
  }
}
