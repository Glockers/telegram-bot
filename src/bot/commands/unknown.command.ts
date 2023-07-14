import { Context } from 'telegraf';
import { AbstactCommand } from './command.class';
import { inject, injectable } from 'inversify';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { IBot } from 'bot/bot';

@injectable()
export class UnknownCommand extends AbstactCommand {
  constructor(@inject(TYPE_BOT_CONTAINERS.Bot) bot: IBot) {
    super(bot.getInstance());
  }

  handle(): void {
    this.bot.on('message', (ctx: Context) => {
      const unknownCommandText = 'Неизвестная команда. Введите /help для получения списка доступных команд.'; // TODO вынести в константу
      ctx.reply(unknownCommandText);
    });
  }
}
