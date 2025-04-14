import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Get addresses from watchList', description: 'Get all addresses from watchList for user by UserID' })
  @ApiResponse({ status: HttpStatus.OK, type: Watchlist })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/get-all-addresses')
  async getAddressesFromWatchList(@Req() request): Promise<Watchlist[]> {
    const userId: number = request?.user?.id as number;
    if (!userId) throw new Error('Invalid user ID');
    return this.watchListService.getAllAddresses(userId);
  }

  @ApiOperation({ summary: 'Add address to watchList', description: 'Add address to watchList with Solana address&name of this wallet in the app' })
  @ApiResponse({ status: HttpStatus.OK, type: addAddressDTO })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
  @ApiBearerAuth()
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

  @ApiOperation({ summary: 'Delete addresses from watchList', description: 'Delete addresses from watchList by userId&accountAddress' })
  @ApiResponse({ status: 200, type: Boolean })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
  @ApiBearerAuth()
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

  @ApiOperation({ summary: 'Update wallet/address name' , description: 'Update wallet/address name by userid' })
  @ApiResponse({ status: 200, type: updateAddressNameDTO })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
  @ApiBearerAuth()
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

  @ApiOperation({ summary: 'Update wallet/address image', description: 'Update wallet/address image' })
  @ApiResponse({ status: 200, type: updateAddressImgDTO })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
  @ApiBearerAuth()
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
  
  @ApiOperation({ summary: 'Update wallet/address on new address', description: 'Update solana wallet/address on new solana address' })
  @ApiResponse({ status: 200, type: updateAddressDTO })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Authorization error (JWT token is missing or invalid).' })
  @ApiBearerAuth()
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
