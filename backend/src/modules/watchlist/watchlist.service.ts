import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { addAddressDTO, deleteAddressDTO, updateAddressImgDTO, updateAddressNameDTO } from './DTO';
import { IntegerDataType } from 'sequelize';
import { Where } from 'sequelize/types/utils';
import { AppError } from 'src/common/constants/errors';
import { ExecException } from 'child_process';

@Injectable()
export class WatchlistService {

    constructor (@InjectModel(Watchlist) private readonly watchListRepository : typeof Watchlist){}

    async getAllAddresses(userId : number): Promise<Watchlist[]>{

        return await this.watchListRepository.findAll({
            where : {
                user : userId
            }
        })
    }

    async addAddressToWatchList(userId: number,dto:addAddressDTO):Promise<addAddressDTO>{
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
    }

    //рез функции destroy кол-во удаленных строк , если ничего не удалится то функция все равно вернет true
    async deleteAddressFromWatchList(userId : number ,account_address : string) : Promise<Boolean>{
       const result =  await this.watchListRepository.destroy({ 
            where: {
                account_address: account_address,
                user: userId
            }
        });
        if(result==0) throw new BadRequestException(AppError.DELETE_WATCHLIST_ADDRESS_ERROR)
        return true;
    }

    async updateWatchListAddressImage(userId: number ,dto:updateAddressImgDTO):Promise<updateAddressImgDTO> {
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
    }

    // возможно стоит вернуть обновленные данные
    async updateWatchListAddressName (userId: number ,dto:updateAddressNameDTO):Promise<updateAddressNameDTO> {

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
    }
}
