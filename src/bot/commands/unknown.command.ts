import { Context } from 'telegraf';
import { AbstactCommand } from './command.class';
import { injectable } from 'inversify';

@injectable()
export class UnknownCommand extends AbstactCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  handle(): void {
    this.bot.on('message', (ctx: Context) => {
      const unknownCommandText = 'Неизвестная команда. Введите /help для получения списка доступных команд.'; // TODO вынести в константу
      ctx.reply(unknownCommandText);
    });
  }
}
