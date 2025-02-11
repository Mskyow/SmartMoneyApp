import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private readonly JWTService;
    private readonly configService;
    constructor(JWTService: JwtService, configService: ConfigService);
    generateJWTToken(user: any): Promise<string>;
}
