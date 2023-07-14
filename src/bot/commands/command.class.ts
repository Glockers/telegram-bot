import { Telegraf } from 'telegraf';

// TODO добавить типизацию
export abstract class AbstactCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(public bot: Telegraf) { }

  abstract handle(): void
}
