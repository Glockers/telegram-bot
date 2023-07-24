import { SCENE } from 'bot/constants/scenes.enum';
import { Scenes } from 'telegraf';
import { ISubscribeService } from 'bot/services/subscribe.service';
import { ISceneBehave } from '../scene.type';
import { inject, injectable } from 'inversify';
import { TYPE_WEATHER_CONTAINERS } from 'container/bot/weather/weather.type';
import { IBotContext } from 'bot/context/context.interface';
import { extractMessageFromChat } from 'utils/extractMessage';
import { ISubscribeWeatherData } from './weather.interface';

export interface SubscribeWeatherData {
  city: string,
  time: string
}

@injectable()
export class SubscribeOnWeatherScene implements ISceneBehave {
  scene: Scenes.WizardScene<IBotContext>;

  subscribeService: ISubscribeService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) subscribeService: ISubscribeService
  ) {
    this.subscribeService = subscribeService;
    this.scene = new Scenes.WizardScene<IBotContext>(
      SCENE.SUBSCRIBE_ON_WEATHER,
      this.askCity,
      this.askTime,
      this.exctractData
    );
  }

  getInstance() {
    return this.scene;
  }

  askCity = async (ctx: IBotContext) => {
    ctx.reply('Введите город');
    ctx.scene.session.subscribeWeather = {} as ISubscribeWeatherData;
    return ctx.wizard.next();
  };

  askTime = async (ctx: IBotContext) => {
    const city = extractMessageFromChat(ctx);
    ctx.scene.session.subscribeWeather.city = city;
    ctx.reply('Введите время');
    return ctx.wizard.next();
  };

  exctractData = async (ctx: IBotContext) => {
    const time = extractMessageFromChat(ctx);
    ctx.scene.session.subscribeWeather.time = time;
    this.subscribeService.subscibeOnWeather(ctx.scene.session.subscribeWeather);
    return ctx.scene.leave();
  };
}
