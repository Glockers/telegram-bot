import { Context, Telegraf } from 'telegraf';
import { Command } from './command.class';

export class UnknownCommand extends Command {
  constructor(public bot: Telegraf<any>) { // TODO Типизировать
    super(bot);
  }

  handle(): void {
    this.bot.on('message', (ctx: Context) => {
      const unknownCommandText = 'Неизвестная команда. Введите /help для получения списка доступных команд.'; // TODO вынести в константу
      ctx.reply(unknownCommandText);
    });
  }
}
