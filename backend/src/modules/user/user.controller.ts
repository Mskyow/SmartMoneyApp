import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDTO } from './DTO';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Update user', description: 'Update user : emeail&name' })
  @ApiResponse({ status: HttpStatus.OK, type: updateUserDTO })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data (DTO validation error).' }) 
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/update-user') // данный метод разбить на два : отдельно name отдельно email
  async updateuser(
    @Body() updateDTO: updateUserDTO,
    @Req() request,
  ): Promise<updateUserDTO> {
    const userEmail : string = request.user.email;
    return await this.userService.updateUser(userEmail, updateDTO);
  }

  @ApiOperation({ summary: 'Delete user', description: 'Delete user from database' })
  @ApiResponse({ status: HttpStatus.OK, type: Boolean })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input data (DTO validation error).' }) 
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/delete-user')
  async deleteUser(@Req() request): Promise<boolean> {
    const userEmail: string = request.user.email;
    return await this.userService.deleteUser(userEmail);
  }
}
