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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const errors_1 = require("../../common/constants/errors");
const bcrypt = require("bcrypt");
const token_service_1 = require("../token/token.service");
let AuthService = class AuthService {
    constructor(userService, tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }
    async registerUsers(dto) {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if (existUser)
            throw new common_1.BadRequestException(errors_1.AppError.USER_EXIST);
        return this.userService.createUser(dto);
    }
    async loginUser(dto) {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if (!existUser)
            throw new common_1.BadRequestException(errors_1.AppError.USER_NOT_EXIST);
        const validatePassword = await bcrypt.compare(dto.password, existUser.password);
        if (!validatePassword)
            throw new common_1.BadRequestException(errors_1.AppError.USER_WRONG_DATA);
        const userData = {
            username: existUser.username,
            email: existUser.email
        };
        const token = await this.tokenService.generateJWTToken(userData);
        const user = await this.userService.publicUser(dto.email);
        if (!user)
            throw new common_1.BadRequestException(errors_1.AppError.USER_NOT_EXIST);
        return { ...user, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        token_service_1.TokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map