import {  Body, Controller,Delete,Get, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDTO } from './DTO';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor (private readonly userService : UserService){}

    @Get("get-user")
    getus()
    {
        return "aaaa"
    }
   
    @ApiTags("User")
    @ApiResponse({status:200, type: updateUserDTO})
    @UseGuards(JwtAuthGuard)
    @Patch("/update-user")
    updateuser(@Body() updateDTO : updateUserDTO, @Req() request):Promise<updateUserDTO>{
        const user = request.user;
        //console.log(user);
        return this.userService.updateUser(user.email,updateDTO)
    }

    @ApiTags("User")
    @ApiResponse({status:200})
    @UseGuards(JwtAuthGuard)
    @Delete("/delete-user")
    deleteUser(@Req() request) : Promise<Boolean>{
        const user = request.user;
        //console.log(user);
        return this.userService.deleteUser(user.email)
    }
}
