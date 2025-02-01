import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(): {
        _id: string;
        index: number;
        guid: string;
        isActive: boolean;
        balance: string;
        picture: string;
        age: number;
        eyeColor: string;
        name: string;
        gender: string;
        company: string;
        email: string;
        phone: string;
        address: string;
        about: string;
        registered: string;
        latitude: number;
        longitude: number;
    }[];
}
