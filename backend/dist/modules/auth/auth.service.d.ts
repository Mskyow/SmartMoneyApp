import { UserService } from '../user/user.service';
import { createUserDTO } from '../user/DTO';
import { UserLoginDTO } from './DTO';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';
export declare class AuthService {
    private readonly userService;
    private readonly tokenService;
    constructor(userService: UserService, tokenService: TokenService);
    registerUsers(dto: createUserDTO): Promise<createUserDTO>;
    loginUser(dto: UserLoginDTO): Promise<AuthUserResponse>;
}
