import { injectable } from 'inversify';
import { CommandName, GREETING_MESSAGE, HELP_MESSAGE } from '@bot/constants';
import { AbstactCommand, CommandHandlers, IBotContext } from '@bot/interfaces';
import { helpMenu } from '@bot/buttons';

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
    ctx.reply(GREETING_MESSAGE);
  }

  private helpHandle(ctx: IBotContext): void {
    ctx.reply(HELP_MESSAGE, helpMenu);
  }
}
