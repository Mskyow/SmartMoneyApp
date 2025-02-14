// переписать без использования библиотеки
import { Body, Controller, Get, Post } from '@nestjs/common';
import { BlockChainService } from './block-chain.service';

@Controller('block-chain')
export class BlockChainController {
    constructor(private readonly blockChainService : BlockChainService){}
    
@Get("/test-blockchain")
    testblockchain(){
     this.blockChainService.testfunc();
    }

    @Post("get-transactions")
    getTransctions(@Body() body){
        console.log(body.walletAddress)
        this.blockChainService.getTransctionsSignatures(body.walletAddress)
    }
}
