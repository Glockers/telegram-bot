import { IBot } from 'bot/bot';
import { helpMenu } from 'bot/buttons/greeting.button';
import { ACTION_NAME } from 'bot/constants/actions.enum';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';
import { IBotContext } from 'bot/interfaces/context.interface';
import { getCommand } from 'common/helpers/commandUtil';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { Telegraf } from 'telegraf';

export class MainAction {
  protected bot: Telegraf<IBotContext>;

  constructor() {
    this.bot = InversifyContainer.get<IBot>(TYPE_BOT_CONTAINERS.Bot).getInstance();

    this.initActions();
  }

  initActions() {
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
      ctx.scene.leave();
      ctx.scene.enter(SCENE.HELP);
    });
  }
}
