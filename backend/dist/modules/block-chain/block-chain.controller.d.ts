import { BlockChainService } from './block-chain.service';
export declare class BlockChainController {
    private readonly blockChainService;
    constructor(blockChainService: BlockChainService);
    testblockchain(): void;
    getTransctions(body: any): void;
}
