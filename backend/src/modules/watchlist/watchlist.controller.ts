import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import {
  addAddressDTO,
  deleteAddressDTO,
  updateAddressDTO,
  updateAddressImgDTO,
  updateAddressNameDTO,
} from './DTO';
import { Watchlist } from './models/watchlist.model';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchListService: WatchlistService) {}

  @ApiResponse({ status: 200, type: Watchlist })
  @UseGuards(JwtAuthGuard)
  @Get('/get-all-addresses')
  async getAddressesFromWatchList(@Req() request): Promise<Watchlist[]> {
    const userId: number = request?.user?.id as number;
    if (!userId) throw new Error('Invalid user ID');
    return this.watchListService.getAllAddresses(userId);
  }

  @ApiResponse({ status: 200, type: addAddressDTO })
  @UseGuards(JwtAuthGuard)
  @Post('/add-address')
  async addAddressToWatchList(
    @Body() addAddressDTO: addAddressDTO,
    @Req() request,
  ): Promise<addAddressDTO> {
    const userId: number = request?.user?.id as number;
    if (!userId) throw new Error('Invalid user ID');
    return this.watchListService.addAddressToWatchList(userId, addAddressDTO);
  }

  @ApiResponse({ status: 200, type: Boolean })
  @UseGuards(JwtAuthGuard)
  @Delete('/delete-address')
  async deleteAddressFromWatchList(
    @Body() deleteAddressDTO: deleteAddressDTO,
    @Req() request,
  ): Promise<boolean> {
    const userId: number = request?.user?.id as number;
    if (!userId) throw new Error('Invalid user ID');
    return this.watchListService.deleteAddressFromWatchList(
      userId,
      deleteAddressDTO.account_address,
    );
  }

  @ApiResponse({ status: 200, type: updateAddressNameDTO })
  @UseGuards(JwtAuthGuard)
  @Patch('/update-address-name')
  async updateWatchListAddressName(
    @Body() updateAddressNameDTO: updateAddressNameDTO,
    @Req() request,
  ): Promise<updateAddressNameDTO> {
    const userId: number = request?.user?.id as number;
    if (!userId) throw new Error('Invalid user ID');
    return this.watchListService.updateWatchListAddressName(
      userId,
      updateAddressNameDTO,
    );
  }

  @ApiResponse({ status: 200, type: updateAddressImgDTO })
  @UseGuards(JwtAuthGuard)
  @Patch('/update-address-img')
  async updateWatchListAddressImage(
    @Body() updateAddressImgDTO: updateAddressImgDTO,
    @Req() request,
  ): Promise<updateAddressImgDTO> {
    const userId: number = request?.user?.id as number;
    if (!userId) throw new Error('Invalid user ID');
    return this.watchListService.updateWatchListAddressImage(
      userId,
      updateAddressImgDTO,
    );
  }

  @ApiResponse({ status: 200, type: updateAddressDTO })
  @UseGuards(JwtAuthGuard)
  @Patch('/update-address')
  async updateWatchListAddress(
    @Body() updateAddressDTO: updateAddressDTO,
    @Req() request,
  ): Promise<updateAddressDTO> {
    const userId: number = request?.user?.id as number;
    if (!userId) throw new Error('Invalid user ID');
    return this.watchListService.updateWatchListAddress(
      userId,
      updateAddressDTO,
    );
  }
}
