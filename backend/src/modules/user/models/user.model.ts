import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;
  // @Column
  // watchlist: string

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE', // Удаление связанных записей
    onUpdate: 'CASCADE', // Обновление связанных записей
  })
  watchlist: Watchlist[];
}
