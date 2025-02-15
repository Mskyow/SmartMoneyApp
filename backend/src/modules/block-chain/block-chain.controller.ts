// переписать без использования библиотеки
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BlockChainService } from './block-chain.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('block-chain')
export class BlockChainController {
    constructor(private readonly blockChainService : BlockChainService){}
    
    @Get("/test-blockchain")
    testblockchain(){
     this.blockChainService.testfunc();
    }
   @ApiTags("BlockChain")
    @ApiResponse({status:200})
    @UseGuards(JwtAuthGuard)
    @Post("get-transactions")
    getTransctions(@Body() body){
        console.log(body.walletAddress)
        this.blockChainService.getTransctionsSignatures(body.walletAddress)
    }
}
