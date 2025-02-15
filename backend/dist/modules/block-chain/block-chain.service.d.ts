import { ConfigService } from '@nestjs/config';
export declare class BlockChainService {
    private readonly configService;
    private solana;
    constructor(configService: ConfigService);
    testfunc(): Promise<void>;
    getTransctionsSignatures(walletAddress: string): Promise<void>;
    getTransactSignatureInfo(signatures: any): Promise<any[]>;
}
