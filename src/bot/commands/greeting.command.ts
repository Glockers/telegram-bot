import { AbstactCommand } from './command.class';
import { injectable } from 'inversify';

@injectable()
export class GreetingCommand extends AbstactCommand {
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
