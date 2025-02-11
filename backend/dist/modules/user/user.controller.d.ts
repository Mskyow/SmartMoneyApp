import { UserService } from './user.service';
import { updateUserDTO } from './DTO';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getus(): string;
    updateuser(updateDTO: updateUserDTO, request: any): Promise<updateUserDTO>;
    deleteUser(request: any): Promise<Boolean>;
}
