import { WatchlistService } from './watchlist.service';
import { addAddressDTO, deleteAddressDTO, updateAddressImgDTO, updateAddressNameDTO } from './DTO';
export declare class WatchlistController {
    private readonly watchListService;
    constructor(watchListService: WatchlistService);
    getAddressesFromWatchList(request: any): Promise<import("./models/watchlist.model").Watchlist[]>;
    addAddressToWatchList(addAddressDTO: addAddressDTO, request: any): Promise<addAddressDTO>;
    deleteAddressFromWatchList(deleteAddressDTO: deleteAddressDTO, request: any): Promise<Boolean>;
    updateWatchListAddressName(updateAddressNameDTO: updateAddressNameDTO, request: any): Promise<updateAddressNameDTO>;
    updateWatchListAddressImage(updateAddressImgDTO: updateAddressImgDTO, request: any): Promise<updateAddressImgDTO>;
}
