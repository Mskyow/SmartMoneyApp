import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { createUserDTO } from '../user/DTO';
import { AppError } from 'src/common/constants/errors';
import { UserLoginDTO } from './DTO';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(dto: createUserDTO): Promise<createUserDTO> {
    try {
      if (!dto.email) {
        throw new BadRequestException(AppError.USER_WRONG_DATA);
      }

      const existUser = await this.userService.findUserByEmail(dto.email);
      if (existUser) throw new BadRequestException(AppError.USER_EXIST);

      return await this.userService.createUser(dto);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    //нету обработки ошибки  с неправильным паролем
    try {
      if (!dto.email || !dto.password) {
        throw new BadRequestException(AppError.USER_WRONG_DATA);
      }

      const existUser = await this.userService.findUserByEmail(dto.email);
      if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);

      const validatePassword = await bcrypt.compare(
        dto.password,
        existUser.password ?? '',
      );
      if (!validatePassword)
        throw new BadRequestException(AppError.USER_WRONG_DATA);

      const user = await this.userService.publicUser(dto.email);
      if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);

      const userId = (user as { dataValues: { id: string } }).dataValues.id;
      const token = await this.tokenService.generateJWTToken(userId);

      return { user, token };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  }
}
