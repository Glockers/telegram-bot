import { Context } from 'telegraf';

// TODO Вынести TOKEN  /  добавить типизацию
export interface IBotContext extends Context {
  session: any;
}
