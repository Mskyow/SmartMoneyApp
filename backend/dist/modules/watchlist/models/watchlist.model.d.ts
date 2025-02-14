import { Model } from "sequelize-typescript";
import { User } from "src/modules/user/models/user.model";
export declare class Watchlist extends Model {
    user: User;
    account_address: string;
    account_name: string;
    profile_image: string;
}
