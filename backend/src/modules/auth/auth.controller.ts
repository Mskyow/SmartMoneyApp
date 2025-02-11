import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from '../user/DTO';
import { UserLoginDTO } from './DTO';
import { AuthUserResponse } from './response';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiResponse({status:201, type: createUserDTO})
    @Post('register')
    register(@Body() dto : createUserDTO):Promise<createUserDTO>{
    return this.authService.registerUsers(dto);
    }
    @ApiResponse({status:200, type: createUserDTO})
    @Post('login')
    login(@Body() dto: UserLoginDTO):Promise<AuthUserResponse>{
    return this.authService.loginUser(dto); 
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test(){
        return true
    }
}
