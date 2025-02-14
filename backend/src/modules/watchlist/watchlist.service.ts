import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { addAddressDTO, deleteAddressDTO, updateAddressImgDTO, updateAddressNameDTO } from './DTO';
import { IntegerDataType } from 'sequelize';
import { Where } from 'sequelize/types/utils';

@Injectable()
export class WatchlistService {

    constructor (@InjectModel(Watchlist) private readonly watchListRepository : typeof Watchlist){}

    async getAllAddresses(user : { id: Promise<IntegerDataType>; }){

        return await this.watchListRepository.findAll({
            where : {
                user : user.id
            }
        })
    }

    async addAddressToWatchList(user: { id: Promise<IntegerDataType>; },dto:addAddressDTO){
     const watchList = {
        user : user.id,
        account_address : dto.account_address,
        account_name : dto.account_name,       
        profile_image: dto.account_image
     }
     console.log(watchList);
     await this.watchListRepository.create(watchList);
     return watchList;
    }

    //рез функции destroy кол-во удаленных строк , если ничего не удалится то функция все равно вернет true
    async deleteAddressFromWatchList(user: { id: Promise<IntegerDataType>; },account_address : string) : Promise<Boolean>{
       const result =  await this.watchListRepository.destroy({ 
            where: {
                account_address: account_address,
                user: user.id
            }
        });
        return true;
    }

    async updateWatchListAddressImage(user: { id: Promise<IntegerDataType>; },dto:updateAddressImgDTO){
        await this.watchListRepository.update(
            {
                profile_image: dto.new_account_image
            },
            {
                where : {
                    user: user.id,
                    account_address: dto.account_address
                }
                
            }
        )
        return dto;
    }

    async updateWatchListAddressName (user: { id: Promise<IntegerDataType>; },dto:updateAddressNameDTO) {

        await this.watchListRepository.update(
            {
                account_name : dto.new_account_name
            },
            {
                where : {
                    user : user.id
                }
            }
        )
        return dto;
    }
}
