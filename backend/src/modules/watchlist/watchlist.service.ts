import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { addAddressDTO, deleteAddressDTO, updateAddressImgDTO, updateAddressNameDTO } from './DTO';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class WatchlistService {

    constructor (@InjectModel(Watchlist) private readonly watchListRepository : typeof Watchlist){}
    async getAllAddresses(userId : number): Promise<Watchlist[]>{

        try{
            return await this.watchListRepository.findAll({
                where : {
                    user : userId
                }
            })
        }
        catch (e){
            throw new Error(e);
        }
    }

    async addAddressToWatchList(userId: number,dto:addAddressDTO):Promise<addAddressDTO>{
    try {
        const watchList = {
            user : userId,
            account_address : dto.account_address,
            account_name : dto.account_name,       
            profile_image: dto.account_image
         }
         //console.log(watchList);
         if(watchList === undefined) throw new BadRequestException(AppError.ADD_WATCHLIST_ADDRESS_ERROR)
         await this.watchListRepository.create(watchList);
         return watchList;
    } catch (error) {
        throw new Error(error);
    }
    }

    //рез функции destroy кол-во удаленных строк , если ничего не удалится то функция все равно вернет true
    async deleteAddressFromWatchList(userId : number ,account_address : string) : Promise<Boolean>{
      try {
        const result =  await this.watchListRepository.destroy({ 
            where: {
                account_address: account_address,
                user: userId
            }
        });
        if(result==0) throw new BadRequestException(AppError.DELETE_WATCHLIST_ADDRESS_ERROR)
        return true;
      } catch (error) {
        throw new Error(error);
      }
    }

    async updateWatchListAddressImage(userId: number ,dto:updateAddressImgDTO):Promise<updateAddressImgDTO> {
       try {
        const [countUpdatedRows] = await this.watchListRepository.update(
            {
                profile_image: dto.new_account_image
            },
            {
                where : {
                    user: userId,
                    account_address: dto.account_address
                }
                
            }
        )
        if(countUpdatedRows === 0) throw new BadRequestException(AppError.UPDATE_WATCHLIST_ADDRESS_ERROR)
        return dto;
       } catch (error) {
        throw new  Error(error);
       }
    }

    // возможно стоит вернуть обновленные данные
    async updateWatchListAddressName (userId: number ,dto:updateAddressNameDTO):Promise<updateAddressNameDTO> {

        try {
            const [countUpdatedRows] = await this.watchListRepository.update(
                {
                    account_name : dto.new_account_name
                },
                {
                    where : {
                        user : userId,
                        account_address: dto.account_address
                    }
                }
            )
            if(countUpdatedRows === 0) throw new BadRequestException(AppError.UPDATE_WATCHLIST_ADDRESS_ERROR)
            return dto;
        } catch (error) {
            throw new Error(error);
            
        }
    }
}
