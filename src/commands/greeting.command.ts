import { Telegraf } from 'telegraf';
import { Command } from './command.class';

export class GreetingCommand extends Command {
  constructor(public bot: Telegraf<any>) {
    super(bot);
  }

  handle(): void {
    this.startHandle();
    this.helpHandle();
  }

  startHandle(): void {
    this.bot.start((ctx) => {
      ctx.reply('Welcome');
    });
  }

  helpHandle(): void {
    this.bot.help((ctx) => {
      ctx.reply('Help message');
    });
  }
}
