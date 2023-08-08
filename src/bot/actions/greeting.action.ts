import { injectable } from 'inversify';
import { AbstactAction } from '@bot/interfaces';
import { Actions, CommandName } from '@bot/constants';
import { getCommand } from '@common/helpers';
import { helpMenu } from '@bot/buttons';

@injectable()
export class GreetingAction extends AbstactAction {
  init(): void {
    this.bot.action(Actions.CAT, (ctx) => {
      getCommand(CommandName.CAT, ctx);
    });

    this.bot.action(Actions.DOG, (ctx) => {
      getCommand(CommandName.DOG, ctx);
    });

    this.bot.action(Actions.HELP_MENU, ctx => {
      ctx.editMessageText('This is help message!', helpMenu);
    });

    this.bot.action(Actions.HELP_MENU_SCEBE, ctx => {
      getCommand(CommandName.HELP, ctx);
    });
  }
}
