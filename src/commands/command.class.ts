import { Telegraf } from 'telegraf';

// TODO добавить типизацию
export abstract class Command {
  // eslint-disable-next-line no-useless-constructor
  constructor(public bot: Telegraf<any>) { }

  abstract handle(): void
}
