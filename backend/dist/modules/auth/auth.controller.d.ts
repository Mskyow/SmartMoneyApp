import { AuthService } from './auth.service';
import { createUserDTO } from '../user/DTO';
import { UserLoginDTO } from './DTO';
import { AuthUserResponse } from './response';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: createUserDTO): Promise<createUserDTO>;
    login(dto: UserLoginDTO): Promise<AuthUserResponse>;
    test(): boolean;
}
