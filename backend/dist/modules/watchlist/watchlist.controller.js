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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchlistController = void 0;
const common_1 = require("@nestjs/common");
const watchlist_service_1 = require("./watchlist.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_guard_1 = require("../../guards/jwt-guard");
const DTO_1 = require("./DTO");
let WatchlistController = class WatchlistController {
    constructor(watchListService) {
        this.watchListService = watchListService;
    }
    getAddressesFromWatchList(request) {
        const user = request.user;
        return this.watchListService.getAllAddresses(user);
    }
    addAddressToWatchList(addAddressDTO, request) {
        const user = request.user;
        return this.watchListService.addAddressToWatchList(user, addAddressDTO);
    }
    deleteAddressFromWatchList(deleteAddressDTO, request) {
        const user = request.user;
        return this.watchListService.deleteAddressFromWatchList(user, deleteAddressDTO.account_address);
    }
    updateWatchListAddressName(updateAddressNameDTO, request) {
        const user = request.user;
        return this.watchListService.updateWatchListAddressName(user, updateAddressNameDTO);
    }
    updateWatchListAddressImage(updateAddressImgDTO, request) {
        const user = request.user;
        return this.watchListService.updateWatchListAddressImage(user, updateAddressImgDTO);
    }
};
exports.WatchlistController = WatchlistController;
__decorate([
    (0, swagger_1.ApiTags)("WatchList"),
    (0, swagger_1.ApiResponse)({ status: 200, type: DTO_1.AddressDTO }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)("/get-all-addresses"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WatchlistController.prototype, "getAddressesFromWatchList", null);
__decorate([
    (0, swagger_1.ApiTags)("WatchList"),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)("/add-address"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.addAddressDTO, Object]),
    __metadata("design:returntype", Promise)
], WatchlistController.prototype, "addAddressToWatchList", null);
__decorate([
    (0, swagger_1.ApiTags)("WatchList"),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)("/delete-address"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.deleteAddressDTO, Object]),
    __metadata("design:returntype", Promise)
], WatchlistController.prototype, "deleteAddressFromWatchList", null);
__decorate([
    (0, swagger_1.ApiTags)("WatchList"),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("/update-address-name"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.updateAddressNameDTO, Object]),
    __metadata("design:returntype", Promise)
], WatchlistController.prototype, "updateWatchListAddressName", null);
__decorate([
    (0, swagger_1.ApiResponse)({ status: 200 }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Patch)("/update-address-img"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTO_1.updateAddressImgDTO, Object]),
    __metadata("design:returntype", Promise)
], WatchlistController.prototype, "updateWatchListAddressImage", null);
exports.WatchlistController = WatchlistController = __decorate([
    (0, common_1.Controller)('watchlist'),
    __metadata("design:paramtypes", [watchlist_service_1.WatchlistService])
], WatchlistController);
//# sourceMappingURL=watchlist.controller.js.map