import { Telegraf } from 'telegraf';
import { Command } from './command.class';

export class StartCommand extends Command {
  constructor(public bot: Telegraf<any>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      ctx.reply('Welcome');
    });
  }
}
