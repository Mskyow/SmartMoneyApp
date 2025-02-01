import { Injectable } from '@nestjs/common';
import { users } from 'src/mocks'; 

@Injectable()
export class UserService {
    getUsers(){
        return users;
    }
}
