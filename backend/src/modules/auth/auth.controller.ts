import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from '../user/DTO';
import { UserLoginDTO } from './DTO';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { AuthUserResponse } from './response';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiOperation({ summary: 'Register user in the system' })
  @ApiResponse({ status:  HttpStatus.CREATED, type: createUserDTO ,description: 'The user was created' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized acces' })
  @ApiBody({  description: 'Json with email, password, name', type: createUserDTO })
  @Post('register')
  register(@Body() dto: createUserDTO): Promise<createUserDTO> {
    return this.authService.registerUsers(dto);
  }
  @ApiOperation({ summary: 'Authorize user in the system' })
  @ApiResponse({ status: HttpStatus.CREATED, type: AuthUserResponse ,description: 'The user was found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized acces' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User not found' })
  @ApiBody({ description: 'Json with email, password', type: UserLoginDTO })
  @Post('login')
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse> {
    return this.authService.loginUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return true;
  }
}
