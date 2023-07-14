import { AbstactCommand } from './command.class';
import { inject, injectable } from 'inversify';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { IBot } from 'bot/bot';

@injectable()
export class GreetingCommand extends AbstactCommand {
  constructor(@inject(TYPE_BOT_CONTAINERS.Bot) bot: IBot) {
    super(bot.getInstance());
  }

  handle(): void {
    this.startHandle();
    this.helpHandle();
  }

  startHandle(): void {
    this.bot.start((ctx) => {
      ctx.reply('Welcome!');
    });
  }

  helpHandle(): void {
    this.bot.help((ctx) => {
      ctx.reply('Help message');
    });
  }
}
