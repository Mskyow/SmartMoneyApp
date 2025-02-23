// переписать без использования библиотеки
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BlockChainService } from './block-chain.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('block-chain')
export class BlockChainController {
    constructor(private readonly blockChainService : BlockChainService){}
    
    @ApiResponse({status:200})
    @Get("/test-blockchain")
    async testblockchain(){
     await this.blockChainService.testfunc();
    }

    @ApiResponse({status:200})
    @UseGuards(JwtAuthGuard)
    @Post("get-transactions")
    async getTransctions(@Body() body){
        console.log(body.walletAddress)
        this.blockChainService.getTransctionsSignatures(body.walletAddress)
    }
}
