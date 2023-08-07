import { CommandName } from 'bot/constants/command.enum';
import { AbstactCommand } from '../interfaces/command.class';
import { injectable } from 'inversify';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/interfaces/context.interface';
import { helpMenu } from 'bot/buttons/greeting.button';

@injectable()
export class GreetingCommand extends AbstactCommand {
  initCommands(): void {
    this.bot.command(CommandName.START, (ctx) =>
      this.getCommands()[CommandName.START]!(ctx)
    );

    this.bot.command(CommandName.HELP, (ctx) =>
      this.getCommands()[CommandName.HELP]!(ctx));
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [CommandName.HELP]: this.helpHandle,
      [CommandName.START]: this.startHandle
    };
    return commandHandlers;
  }

  private startHandle(ctx: IBotContext): void {
    ctx.reply('Welcome!');
  }

  private helpHandle(ctx: IBotContext): void {
    ctx.reply('This is help message!', helpMenu);
  }
}
