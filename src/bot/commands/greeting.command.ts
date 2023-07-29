import { COMMAND } from 'bot/constants/command.enum';
import { AbstactCommand } from './command.class';
import { injectable } from 'inversify';

@injectable()
export class GreetingCommand extends AbstactCommand {
  handle(): void {
    this.startHandle();
    this.helpHandle();
  }

  startHandle(): void {
    this.bot.command(COMMAND.START, (ctx) =>
      ctx.reply('Welcome!')
    );
  }

  helpHandle(): void {
    this.bot.command(COMMAND.HELP, (ctx) =>
      ctx.reply('Welcome!')
    );
  }
}
