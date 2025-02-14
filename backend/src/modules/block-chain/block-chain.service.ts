import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as web3 from '@solana/web3.js'
import { Connection } from '@solana/web3.js';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class BlockChainService {

    private solana: Connection;

    constructor(private readonly configService: ConfigService){
        const https_provider_link = this.configService.get('solana_https_provider') 
        if(!https_provider_link) throw new BadRequestException(AppError.SOLANA_HTTPS_PROVIDER_UNDEFIND)
        this.solana = new web3.Connection(https_provider_link);
    }

    async testfunc(){
       
        console.log(await this.solana.getSlot());
    }

    async getTransctionsSignatures(walletAddress: string){
        console.log(walletAddress)
        const publicKey = new web3.PublicKey(walletAddress);
        const signatures = await this.solana.getSignaturesForAddress(publicKey, { limit: 10 });
        console.log("Signatures:", signatures);
        await this.getTransactSignatureInfo(signatures);
    }

    async getTransactSignatureInfo(signatures) {
        const transactions = await Promise.all(signatures.map(
            async (tx) => {
                return await this.solana.getTransaction(tx.signature,{
                    commitment: "finalized",
                    maxSupportedTransactionVersion : 0,
                })
            }
        ))
        console.log("Transactions:", transactions);
        return transactions;
    }
}
