import { SCENE } from 'bot/constants/scenes.enum';
import { IBotContext } from 'bot/context/context.interface';
import { ISubscribeService } from 'bot/services/subscribe.service';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { inject, injectable } from 'inversify';

export interface ISubscribeController {}

@injectable()
export class SubscribeController implements ISubscribeController {
  subscribeService: ISubscribeService;
  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService)
    subscribeService: ISubscribeService
  ) {
    this.subscribeService = subscribeService;
  }
}
