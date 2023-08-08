import { injectable } from 'inversify';
import { AbstactAction } from '@bot/interfaces/actions.class';
import { Actions } from '@bot/constants/actions.enum';
import { getCommand } from '@common/helpers/commandUtil';
import { CommandName } from '@bot/constants/command.enum';
import { helpMenu } from '@bot/buttons/greeting.button';

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
