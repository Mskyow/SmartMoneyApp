import { User } from './models/user.model';
import { createUserDTO, updateUserDTO } from './DTO';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: typeof User);
    hashPassword(password: any): Promise<string>;
    findUserByEmail(email: string): Promise<User | null>;
    createUser(dto: createUserDTO): Promise<createUserDTO>;
    publicUser(email: string): Promise<User | null>;
    updateUser(email: string, dto: updateUserDTO): Promise<updateUserDTO>;
    deleteUser(email: string): Promise<Boolean>;
}
