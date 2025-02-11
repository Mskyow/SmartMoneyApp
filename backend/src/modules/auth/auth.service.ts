import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createUserDTO } from '../user/DTO';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './DTO';
import * as bcrypt from 'bcrypt'
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
constructor(private readonly userService : UserService,
    private readonly tokenService : TokenService
){}

    async registerUsers(dto: createUserDTO):Promise<createUserDTO>{
        const existUser = await this.userService.findUserByEmail(dto.email);
        if(existUser) throw new BadRequestException(AppError.USER_EXIST)
        return this.userService.createUser(dto)
    }
    async loginUser(dto: UserLoginDTO):Promise<AuthUserResponse>{
        const existUser = await this.userService.findUserByEmail(dto.email)
        // console.log(existUser)
        if(!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
        const validatePassword = await bcrypt.compare(dto.password, existUser.password)
        if(!validatePassword) throw new BadRequestException(AppError.USER_WRONG_DATA)
            const userData = {
                username : existUser.username,
                email : existUser.email
            }
        const token = await this.tokenService.generateJWTToken(userData);
        const user = await this.userService.publicUser(dto.email); // два запроса в базу данных , костыль возможно
        if(!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
        return {...user,token};
    }

}
