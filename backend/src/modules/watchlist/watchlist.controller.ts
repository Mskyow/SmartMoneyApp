import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { addAddressDTO, AddressDTO, deleteAddressDTO, updateAddressImgDTO, updateAddressNameDTO } from './DTO';

@Controller('watchlist')
export class WatchlistController {
    constructor (private readonly watchListService : WatchlistService){}

   @ApiTags("WatchList")
   @ApiResponse({status:200,type:AddressDTO})
   @UseGuards(JwtAuthGuard)
   @Get("/get-all-addresses")
   getAddressesFromWatchList(@Req() request){
       const user = request.user;
       return this.watchListService.getAllAddresses(user);
   }

   @ApiTags("WatchList")
       @ApiResponse({status:200})
       @UseGuards(JwtAuthGuard)
       @Post("/add-address")
       addAddressToWatchList(@Body() addAddressDTO : addAddressDTO, @Req() request):Promise<addAddressDTO>{
           const user = request.user;
           return this.watchListService.addAddressToWatchList(user, addAddressDTO)
       }

    @ApiTags("WatchList")
       @ApiResponse({status:200})
       @UseGuards(JwtAuthGuard)
       @Delete("/delete-address") // возможно лучше удалять по имени адреса , выданное юзером нашего прило.
       deleteAddressFromWatchList(@Body() deleteAddressDTO : deleteAddressDTO, @Req() request):Promise<Boolean>{
           const user = request.user;
           return this.watchListService.deleteAddressFromWatchList(user,deleteAddressDTO.account_address)
       }

       
    @ApiTags("WatchList")
        @ApiResponse({status:200})
        @UseGuards(JwtAuthGuard)
        @Patch("/update-address-name")
        updateWatchListAddressName(@Body() updateAddressNameDTO : updateAddressNameDTO, @Req() request):Promise<updateAddressNameDTO>{
            const user = request.user;
            return this.watchListService.updateWatchListAddressName (user,updateAddressNameDTO)
        }
    // @ApiTags("WatchList")
        @ApiResponse({status:200})
        @UseGuards(JwtAuthGuard)
        @Patch("/update-address-img")
        updateWatchListAddressImage(@Body() updateAddressImgDTO : updateAddressImgDTO, @Req() request):Promise<updateAddressImgDTO>{
            const user = request.user;
            return this.watchListService.updateWatchListAddressImage (user,updateAddressImgDTO)
        }


}
