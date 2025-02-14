import { Watchlist } from './models/watchlist.model';
import { addAddressDTO, updateAddressImgDTO, updateAddressNameDTO } from './DTO';
import { IntegerDataType } from 'sequelize';
export declare class WatchlistService {
    private readonly watchListRepository;
    constructor(watchListRepository: typeof Watchlist);
    getAllAddresses(user: {
        id: Promise<IntegerDataType>;
    }): Promise<Watchlist[]>;
    addAddressToWatchList(user: {
        id: Promise<IntegerDataType>;
    }, dto: addAddressDTO): Promise<{
        user: Promise<IntegerDataType>;
        account_address: string;
        account_name: string | undefined;
        profile_image: string | undefined;
    }>;
    deleteAddressFromWatchList(user: {
        id: Promise<IntegerDataType>;
    }, account_address: string): Promise<Boolean>;
    updateWatchListAddressImage(user: {
        id: Promise<IntegerDataType>;
    }, dto: updateAddressImgDTO): Promise<updateAddressImgDTO>;
    updateWatchListAddressName(user: {
        id: Promise<IntegerDataType>;
    }, dto: updateAddressNameDTO): Promise<updateAddressNameDTO>;
}
