"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockChainService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const web3 = require("@solana/web3.js");
const errors_1 = require("../../common/constants/errors");
let BlockChainService = class BlockChainService {
    constructor(configService) {
        this.configService = configService;
        const https_provider_link = this.configService.get('solana_https_provider');
        if (!https_provider_link)
            throw new common_1.BadRequestException(errors_1.AppError.SOLANA_HTTPS_PROVIDER_UNDEFIND);
        this.solana = new web3.Connection(https_provider_link);
    }
    async testfunc() {
        console.log(await this.solana.getSlot());
    }
    async getTransctionsSignatures(walletAddress) {
        console.log(walletAddress);
        const publicKey = new web3.PublicKey(walletAddress);
        const signatures = await this.solana.getSignaturesForAddress(publicKey, { limit: 10 });
        console.log("Signatures:", signatures);
        await this.getTransactSignatureInfo(signatures);
    }
    async getTransactSignatureInfo(signatures) {
        const transactions = await Promise.all(signatures.map(async (tx) => {
            return await this.solana.getTransaction(tx.signature, {
                commitment: "finalized",
                maxSupportedTransactionVersion: 0,
            });
        }));
        console.log("Transactions:", transactions);
        return transactions;
    }
};
exports.BlockChainService = BlockChainService;
exports.BlockChainService = BlockChainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BlockChainService);
//# sourceMappingURL=block-chain.service.js.map