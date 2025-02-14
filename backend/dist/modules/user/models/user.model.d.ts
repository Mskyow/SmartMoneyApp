import { Model } from "sequelize-typescript";
import { Watchlist } from "src/modules/watchlist/models/watchlist.model";
export declare class User extends Model {
    username: string;
    email: string;
    password: string;
    watchlist: Watchlist[];
}
