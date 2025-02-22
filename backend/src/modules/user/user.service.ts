import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { createUserDTO, updateUserDTO } from './DTO';
import { Watchlist } from '../watchlist/models/watchlist.model';

@Injectable()
export class UserService {
  constructor (@InjectModel(User) private readonly userRepository: typeof User) {}

  async hashPassword(password : string):Promise<string>{
    try {
      return bcrypt.hash(password,10);
    } catch (error) {
      throw new Error(error);
    }
  }
 // обратить внимание на метод этот 25 видос
  async findUserByEmail(email : string):Promise<User | null>{
    try {
      return this.userRepository.findOne({ where : {email}});
    } catch (error) {
      throw new Error(error)
    }
  }
  async findUserById(id : string):Promise<User | null>{
    try {
      return this.userRepository.findOne({ where : {id}});
    } catch (error) {
      throw new Error(error)
    }
  }
  async createUser(dto : createUserDTO) : Promise<createUserDTO>{
    
       try {
        dto.password = await this.hashPassword(dto.password);
        await this.userRepository.create(
            {
                username : dto.username,
                email: dto.email,
                password: dto.password
            }
        )
    
    return dto;
       } catch (error) {
        throw new Error(error);
       }
  }
  //возврат
  async publicUser (email: string) : Promise<User | null>{
  try {
    return this.userRepository.findOne(
      {
        where: {email},
        attributes: {exclude:['password']},
        include : {
          model: Watchlist,
          required : false
        }
      }
    )
  } catch (error) {
    throw new Error(error)
  }
  }
  async updateUser(email : string, dto: updateUserDTO):Promise<updateUserDTO>{
   try {
      await this.userRepository.update(dto,{where:{email}})
      return dto
   } catch (error) {
    throw new Error(error);
   }
  }
  async deleteUser(email:string) : Promise<Boolean>{
     try {
      await this.userRepository.destroy({where:{email}})
     return true;
     } catch (error) {
      throw new Error(error);
     }
  }
}
