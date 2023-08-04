import { menuRecomend } from 'bot/buttons/recomend.button';
import { ACTION_NAME } from 'bot/constants/actions.enum';
import { AbstactAction } from 'bot/interfaces/actions.class';
import { injectable } from 'inversify';

@injectable()
export class RecommendAction extends AbstactAction {
  // eslint-disable-next-line no-useless-constructor
  constructor(
  ) {
    super();
  }

  init() {
    this.bot.action(ACTION_NAME.RECOMMEND_MENU, (ctx) => {
      ctx.editMessageText('this is reccomend Menu', menuRecomend);
    });

    this.bot.action(ACTION_NAME.RECOMMEND_EVENTS, (ctx) => {
      // ctx.editMessageText('this is reccomend Menu', menuRecomend);
      // this.controller.getRecommendEvents(ctx);
    });

    this.bot.action(ACTION_NAME.RECOMMEND_PLACE, (ctx) => {
      // this.controller.getRecommendPlace(ctx)
    });
  }
}
