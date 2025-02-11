import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
declare const JWTStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JWTStrategy extends JWTStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: any): Promise<any>;
}
export {};
