import { inject, injectable } from 'inversify';
import { menuRecomend } from '@bot/buttons';
import { Actions, MENU_RECOMMEND } from '@bot/constants';
import { RecommendController } from '@bot/controllers';
import { AbstactAction } from '@bot/interfaces';
import { catchAsyncFunction } from '@common/helpers';
import { TYPE_RECOMMEND_CONTAINERS } from '@container/bot';
import { KindsPlace } from '@infra/api';

@injectable()
export class RecommendAction extends AbstactAction {
  private readonly recommendController: RecommendController;

  constructor(
    @inject(TYPE_RECOMMEND_CONTAINERS.RecommendController) recommendController: RecommendController
  ) {
    super();
    this.recommendController = recommendController;
  }

  init(): void {
    this.bot.action(Actions.RECOMMEND_MENU, (ctx) => {
      ctx.editMessageText(MENU_RECOMMEND, menuRecomend);
    });

    this.bot.action(Actions.RECOMMEND_CAFE, (ctx) => {
      catchAsyncFunction(ctx, () => this.recommendController.getRecommendPlaces(ctx, KindsPlace.CAFE));
    });

    this.bot.action(Actions.RECOMMEND_ATTRACTIONS, (ctx) => {
      catchAsyncFunction(ctx, () => this.recommendController.getRecommendPlaces(ctx, KindsPlace.ATTRACTIONS));
    });

    this.bot.action(Actions.RECOMMEND_THEATRES_AND_ENTERTAINMENTS, (ctx) => {
      catchAsyncFunction(ctx, () => this.recommendController.getRecommendPlaces(ctx, KindsPlace.THEATRES_AND_ENTERTAINMENTS));
    });

    this.bot.action(Actions.RECOMMEND_SHOPS, (ctx) => {
      catchAsyncFunction(ctx, () => this.recommendController.getRecommendPlaces(ctx, KindsPlace.SHOPS));
    });

    this.bot.action(Actions.RECOMMEND_BANK, (ctx) => {
      catchAsyncFunction(ctx, () => this.recommendController.getRecommendPlaces(ctx, KindsPlace.BANKS));
    });
  }
}
