import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { BadRequestException, Injectable } from "@nestjs/common";
import { AppError } from "src/common/constants/errors";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor (private configService : ConfigService){
        const  secret = configService.get('secret_jwt');
        if(!secret) throw new BadRequestException(AppError.JWT_SECRET_UNDEFINED) ;
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret, // Указываем секретный ключ
            ignoreExpiration: false
        });
    }

    async validate(payload: any) {
        return {...payload.user}
    }
}