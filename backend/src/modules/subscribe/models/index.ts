import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Watchlist } from 'src/modules/watchlist/models/watchlist.model';

@Table
export class subscriptions extends Model {
  @Column
  user: string;

  @Column
  account_adress: string;

  @HasMany(() => Watchlist, {
    onDelete: 'CASCADE', // Удаление связанных записей
    onUpdate: 'CASCADE', // Обновление связанных записей
  })
  watchlist: Watchlist[];
}
