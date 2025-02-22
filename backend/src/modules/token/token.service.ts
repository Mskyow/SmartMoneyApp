import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';

@Injectable()
export class TokenService {
    constructor (private readonly JWTService :  JwtService,
        private readonly configService : ConfigService
    ){}

    async generateJWTToken(userId : string ){
       try {
        const payload = { sub : userId};
 
        console.log(payload)
        return this.JWTService.sign(payload,{
            secret: this.configService.get('secret_jwt'),
            expiresIn: this.configService.get('expire_time_jwt')
        })
       } catch (error) {
        throw new Error(error);
       }
    }
}
