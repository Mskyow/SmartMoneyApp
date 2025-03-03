import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJWTToken(userId: string): Promise<string> {
    try {
      if (!userId) {
        throw new Error('User ID is required');
      }

      const payload = { sub: userId };

      console.log(payload);

      const secretKey = this.configService.get<string>('secret_jwt');
      const expiresIn = this.configService.get<string | number>(
        'expire_time_jwt',
      );

      if (!secretKey || !expiresIn) {
        throw new Error('JWT secret or expiration time is not defined');
      }

      return this.jwtService.sign(payload, {
        secret: secretKey,
        expiresIn: expiresIn,
      });
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
