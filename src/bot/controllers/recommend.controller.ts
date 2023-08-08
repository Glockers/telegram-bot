import { injectable } from 'inversify';
import { AppScenes } from '@bot/constants';
import { IBotContext } from '@bot/interfaces';
import { SessionPlace } from '@bot/scenes';
import { KindsPlace } from '@infra/api';

export interface IRecommendController {
  getRecommendPlaces: (ctx: IBotContext, kind: KindsPlace) => Promise<void>
}

@injectable()
export class RecommendController implements IRecommendController {
  async getRecommendPlaces(ctx: IBotContext, kind: KindsPlace): Promise<void> {
    ctx.scene.session.places = {} as SessionPlace;
    ctx.scene.session.places.kinds = kind;
    ctx.scene.enter(AppScenes.GET_RECOMMEND_PLACE);
  }
}
