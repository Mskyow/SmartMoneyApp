"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("../user/user.module");
const config_1 = require("@nestjs/config");
const index_1 = require("../../configurations/index");
const sequelize_1 = require("@nestjs/sequelize");
const user_model_1 = require("../user/models/user.model");
const auth_module_1 = require("../auth/auth.module");
const token_module_1 = require("../token/token.module");
const watchlist_module_1 = require("../watchlist/watchlist.module");
const watchlist_model_1 = require("../watchlist/models/watchlist.model");
const block_chain_module_1 = require("../../block-chain/block-chain.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [index_1.default] }),
            sequelize_1.SequelizeModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    dialect: "postgres",
                    host: configService.get('db_host'),
                    port: configService.get('db_port'),
                    username: configService.get('db_user'),
                    password: configService.get('db_password'),
                    database: configService.get('db_name'),
                    synchronize: true,
                    autoLoadModels: true,
                    models: [user_model_1.User, watchlist_model_1.Watchlist]
                })
            }),
            auth_module_1.AuthModule,
            token_module_1.TokenModule,
            watchlist_module_1.WatchlistModule,
            block_chain_module_1.BlockChainModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map