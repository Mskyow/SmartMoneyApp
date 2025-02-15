import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { addAddressDTO, AddressDTO, deleteAddressDTO, updateAddressImgDTO, updateAddressNameDTO } from './DTO';
import { Watchlist } from './models/watchlist.model';

@Controller('watchlist')
export class WatchlistController {
    constructor (private readonly watchListService : WatchlistService){}

   @ApiResponse({status:200,type:Watchlist})
   @UseGuards(JwtAuthGuard)
   @Get("/get-all-addresses")
   getAddressesFromWatchList(@Req() request):Promise<Watchlist[]>{
       const user = request.user;
       return this.watchListService.getAllAddresses(user);
   }

       @ApiResponse({status:200,type:addAddressDTO})
       @UseGuards(JwtAuthGuard)
       @Post("/add-address")
       addAddressToWatchList(@Body() addAddressDTO : addAddressDTO, @Req() request):Promise<addAddressDTO>{
           const user = request.user.id as number;
           return this.watchListService.addAddressToWatchList(user, addAddressDTO)
       }

       @ApiResponse({status:200,type: Boolean})
       @UseGuards(JwtAuthGuard)
       @Delete("/delete-address") // возможно лучше удалять по имени адреса , выданное юзером нашего прило.
       deleteAddressFromWatchList(@Body() deleteAddressDTO : deleteAddressDTO, @Req() request):Promise<Boolean>{
           const user = request.user.id as number;
           return this.watchListService.deleteAddressFromWatchList(user,deleteAddressDTO.account_address)
       }

       
        @ApiResponse({status:200,type:updateAddressNameDTO})
        @UseGuards(JwtAuthGuard)
        @Patch("/update-address-name")
        async updateWatchListAddressName(@Body() updateAddressNameDTO : updateAddressNameDTO, @Req() request):Promise<updateAddressNameDTO>{
            const user = request.user.id as number;
            return this.watchListService.updateWatchListAddressName (user,updateAddressNameDTO)
        }
        @ApiResponse({status:200,type:updateAddressImgDTO})
        @UseGuards(JwtAuthGuard)
        @Patch("/update-address-img")
        async updateWatchListAddressImage(
            @Body() updateAddressImgDTO : updateAddressImgDTO, 
            @Req() request 
        ):Promise<updateAddressImgDTO>{
            const user = request.user.id as number ;
            return this.watchListService.updateWatchListAddressImage (user,updateAddressImgDTO)
        }


}
