import { Body, Controller, Delete, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { addAddressDTO, AddressDTO, deleteAddressDTO, updateAddressDTO, updateAddressImgDTO, updateAddressNameDTO } from './DTO';
import { Watchlist } from './models/watchlist.model';

@Controller('watchlist')
export class WatchlistController {
    constructor (private readonly watchListService : WatchlistService){}

   @ApiResponse({status:200,type:Watchlist})
   @UseGuards(JwtAuthGuard)
   @Get("/get-all-addresses")
   getAddressesFromWatchList(@Req() request):Promise<Watchlist[]>{
       const userid = request.user.id as number;
    //    console.log(request)
       return this.watchListService.getAllAddresses(userid);
   }

       @ApiResponse({status:200,type:addAddressDTO})
       @UseGuards(JwtAuthGuard)
       @Post("/add-address")
       addAddressToWatchList(@Body() addAddressDTO : addAddressDTO, @Req() request):Promise<addAddressDTO>{
           const userid = request.user.id as number;
           return this.watchListService.addAddressToWatchList(userid, addAddressDTO)
       }

       @ApiResponse({status:200,type: Boolean})
       @UseGuards(JwtAuthGuard)
       @Delete("/delete-address") // возможно лучше удалять по имени адреса , выданное юзером нашего прило.
       deleteAddressFromWatchList(@Body() deleteAddressDTO : deleteAddressDTO, @Req() request):Promise<Boolean>{
           const userid = request.user.id as number;
           return this.watchListService.deleteAddressFromWatchList(userid,deleteAddressDTO.account_address)
       }

       
        @ApiResponse({status:200,type:updateAddressNameDTO})
        @UseGuards(JwtAuthGuard)
        @Patch("/update-address-name")
        async updateWatchListAddressName(
            @Body() updateAddressNameDTO : updateAddressNameDTO,
            @Req() request):Promise<updateAddressNameDTO>{
            const userid = request.user.id as number;
            return this.watchListService.updateWatchListAddressName (userid,updateAddressNameDTO)
        }


        @ApiResponse({status:200,type:updateAddressImgDTO})
        @UseGuards(JwtAuthGuard)
        @Patch("/update-address-img")
        async updateWatchListAddressImage(
            @Body() updateAddressImgDTO : updateAddressImgDTO, 
            @Req() request 
        ):Promise<updateAddressImgDTO>{
            const userid = request.user.id as number ;
            return this.watchListService.updateWatchListAddressImage (userid,updateAddressImgDTO)
        }
        @ApiResponse({ status: 200, type: updateAddressDTO })
        @UseGuards(JwtAuthGuard)
        @Patch("/update-address")
        async updateWatchListAddress(
            @Body() updateAddressDTO: updateAddressDTO, 
            @Req() request
        ): Promise<updateAddressDTO> {
            const userid = request.user.id as number;
            return this.watchListService.updateWatchListAddress(userid, updateAddressDTO);
        }

}
