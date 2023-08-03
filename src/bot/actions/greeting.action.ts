import { injectable } from 'inversify';
import { AbstactAction } from 'bot/interfaces/actions.class';
import { ACTION_NAME } from 'bot/constants/actions.enum';
import { getCommand } from 'common/helpers/commandUtil';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { helpMenu } from 'bot/buttons/greeting.button';

@injectable()
export class GreetingAction extends AbstactAction {
  // eslint-disable-next-line no-useless-constructor
  constructor(
  ) {
    super();
  }

  init() {
    this.bot.action(ACTION_NAME.CAT, (ctx) => {
      getCommand(COMMAND_NAME.CAT, ctx);
    });

    this.bot.action(ACTION_NAME.DOG, (ctx) => {
      getCommand(COMMAND_NAME.DOG, ctx);
    });

    this.bot.action(ACTION_NAME.HELP_MENU, ctx => {
      ctx.editMessageText('This is help message!', helpMenu);
    });

    this.bot.action(ACTION_NAME.HELP_MENU_SCEBE, ctx => {
      getCommand(COMMAND_NAME.HELP, ctx);
    });
  }
}
