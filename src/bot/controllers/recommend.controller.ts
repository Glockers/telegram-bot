import { SCENE } from 'bot/constants/scenes.enum';
import { IBotContext } from 'bot/interfaces/context.interface';
import { SessionPlace } from 'bot/scenes/recomend/recommend.type';
import { Kinds } from 'infra/api/recommend/place.type';
import { injectable } from 'inversify';

export interface IRecommendController {
  getRecommendPlaces: (ctx: IBotContext, kind: Kinds) => Promise<void>
}

@injectable()
export class RecommendController implements IRecommendController {
  // animalService: IAnimalService;

  // constructor(
  //   // @inject(TYPE_ANIMAL_CONTAINERS.AnimalService) animalService: IAnimalService
  // ) {
  //   // this.animalService = animalService;
  // }

  async getRecommendPlaces(ctx: IBotContext, kind: Kinds): Promise<void> {
    ctx.scene.session.places = {} as SessionPlace;
    ctx.scene.session.places.kinds = kind;
    ctx.scene.enter(SCENE.GET_RECOMMEND_PLACE);
  }
}
