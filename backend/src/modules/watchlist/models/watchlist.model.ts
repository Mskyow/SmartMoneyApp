import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/modules/user/models/user.model"

@Table
export class Watchlist extends Model{
    @ForeignKey(()=> User)
    user: User

    @Column
    account_address: string

    @Column
    account_name : string

    @Column
    profile_image: string
    
}