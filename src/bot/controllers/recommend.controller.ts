import { AppScenes } from '@bot/constants/scenes.enum';
import { IBotContext } from '@bot/interfaces/context.interface';
import { SessionPlace } from '@bot/scenes/recomend/recommend.type';
import { KindsPlace } from '@infra/api/recommend/place.type';
import { injectable } from 'inversify';

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
