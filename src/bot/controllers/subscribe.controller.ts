import { SCENE } from 'bot/constants/scenes.enum';
import { IBotContext } from 'bot/context/context.interface';
import { inject, injectable } from 'inversify';

export interface ISubscribeController {
  subscribeOnWeather: (ctx: IBotContext) => void;
  unsubscribeFromWeather: (ctx: IBotContext) => void;
}

@injectable()
export class SubscribeController implements ISubscribeController {
  //   animalService: IAnimalService;
  //   constructor(
  //     @inject(TYPE_ANIMAL_CONTAINERS.AnimalService) animalService: IAnimalService
  //   ) {
  //     this.animalService = animalService;
  //   }

  async subscribeOnWeather(ctx: IBotContext) {
    await ctx.scene.enter(SCENE.SUBSCRIBE_ON_WEATHER);
  }
  unsubscribeFromWeather(ctx: IBotContext) {}
}
