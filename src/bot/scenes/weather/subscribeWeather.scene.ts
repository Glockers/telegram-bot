import { SCENE } from 'bot/constants/scenes.enum';
import { Scenes } from 'telegraf';
import { ISubscribeService } from 'bot/services/subscribe.service';
import { ISceneBehave } from '../scene.type';
import { inject, injectable } from 'inversify';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';

@injectable()
export class SubscribeOnWeatherScene implements ISceneBehave {
  scene: Scenes.WizardScene<any>;

  subscribeService: ISubscribeService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) subscribeService: ISubscribeService
  ) {
    this.subscribeService = subscribeService;
    this.scene = new Scenes.WizardScene<any>(
      SCENE.SUBSCRIBE_ON_WEATHER,
      this.askCity,
      this.askTime,
      this.exctractData
    );
  }

  getInstance() {
    return this.scene;
  }

  askCity = async (ctx: any) => {
    ctx.reply('Введите город');
    ctx.wizard.state.subscribe_weather = {};
    return ctx.wizard.next();
  };

  askTime = async (ctx: any) => {
    ctx.wizard.state.subscribe_weather.city = ctx.message.text;
    ctx.reply('Введите время');
    return ctx.wizard.next();
  };

  exctractData = async (ctx: any) => {
    ctx.wizard.state.subscribe_weather.time = ctx.message.text;
    console.log(this.subscribeService);
    this.subscribeService.subscibeOnWeather(ctx.wizard.state);
    return ctx.scene.leave();
  };
}
