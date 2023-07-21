import { SCENE } from 'bot/constants/scenes.enum';
import { ISubscribeService } from 'bot/services/subscribe.service';
import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { inject, injectable } from 'inversify';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';

@injectable()
export class UnsubscribeOnWeatherScene implements ISceneBehave {
  scene: Scenes.WizardScene<any>;

  service: ISubscribeService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) service: ISubscribeService
  ) {
    this.service = service;
    this.scene = new Scenes.WizardScene<any>(
      SCENE.UNSUBSCRIBE_FROM_WEATHER,
      this.askID,
      this.exctractData
    );
  }

  public initService(service: ISubscribeService) {
    if (!this.service) {
      this.service = service;
    }
  }

  getInstance() {
    return this.scene;
  }

  private askID = async (ctx: any) => {
    ctx.reply('Введите ID подписки');
    ctx.wizard.state.subscribe_weather = {};
    return ctx.wizard.next();
  };

  private exctractData = async (ctx: any) => {
    ctx.wizard.state.subscribe_weather.id = ctx.message.text;
    this.service?.deleteWeather(ctx.wizard.state);
    return ctx.scene.leave();
  };
}
