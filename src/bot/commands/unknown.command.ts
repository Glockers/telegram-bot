import { injectable } from 'inversify';
import { CommandHandlers, IBotContext, AbstactCommand } from '@bot/interfaces';
import { Actions, UNKNOWN_COMMAND } from '@bot/constants';
import { backToMainMenu } from '@bot/buttons';

@injectable()
export class UnknownCommand extends AbstactCommand {
  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
    };
    return commandHandlers;
  }

  initCommands(): void {
    this.bot.on('message', (ctx: IBotContext): void => {
      this.uknownHandle(ctx);
    });
  }

  private uknownHandle(ctx: IBotContext): void {
    ctx.reply(UNKNOWN_COMMAND, backToMainMenu(Actions.HELP_MENU));
  }
}
