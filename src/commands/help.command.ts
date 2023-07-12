import { Telegraf } from 'telegraf';
import { Command } from './command.class';

export class HelpCommand extends Command {
  constructor(public bot: Telegraf<any>) {
    super(bot);
  }

  handle(): void {
    this.bot.help((ctx) => {
      ctx.reply('Help message');
    });
  }
}
