import { COMMAND_NAME } from 'bot/constants/command.enum';
import { AbstactCommand } from './command.class';
import { injectable } from 'inversify';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/context/context.interface';

@injectable()
export class GreetingCommand extends AbstactCommand {
  initCommands(): void {
    this.bot.command(COMMAND_NAME.START, (ctx) =>
      this.getCommands()[COMMAND_NAME.START]!(ctx)
    );

    this.bot.command(COMMAND_NAME.HELP, (ctx) =>
      this.getCommands()[COMMAND_NAME.HELP]!(ctx));
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [COMMAND_NAME.HELP]: this.helpHandle,
      [COMMAND_NAME.START]: this.startHandle
    };
    return commandHandlers;
  }

  private startHandle(ctx: IBotContext): void {
    ctx.reply('Welcome!');
  }

  private helpHandle(ctx: IBotContext): void {
    ctx.reply('This is help message!');
  }
}
