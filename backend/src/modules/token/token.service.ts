import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/models/user.model';

@Injectable()
export class TokenService {
    constructor (private readonly JWTService :  JwtService,
        private readonly configService : ConfigService
    ){}

    async generateJWTToken(user ){
        const payload = {user};
 
        console.log(this.configService.get('expire_time_jwt'))
    
        return this.JWTService.sign(payload,{
            secret: this.configService.get('secret_jwt'),
            expiresIn: this.configService.get('expire_time_jwt')
        })
    }
}
