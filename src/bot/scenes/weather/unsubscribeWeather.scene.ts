import { SCENE } from 'bot/constants/scenes.enum';
import { ISubscribeService } from 'bot/services/subscribe.service';
import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { inject, injectable } from 'inversify';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { IBotContext } from 'bot/context/context.interface';
import { IUnsubscribeWeather } from './weather.interface';
import { extractMessageFromChat } from 'utils/extractMessage';

@injectable()
export class UnsubscribeOnWeatherScene implements ISceneBehave {
  scene: Scenes.WizardScene<IBotContext>;

  service: ISubscribeService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) service: ISubscribeService
  ) {
    this.service = service;
    this.scene = new Scenes.WizardScene<IBotContext>(
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

  private askID = async (ctx: IBotContext) => {
    ctx.reply('Введите ID подписки');
    ctx.scene.session.unsubscribeWeather = {} as IUnsubscribeWeather;
    return ctx.wizard.next();
  };

  private exctractData = async (ctx: IBotContext) => {
    const id = Number(extractMessageFromChat(ctx));
    ctx.scene.session.unsubscribeWeather.id = id;
    this.service?.deleteWeather(ctx.scene.session.unsubscribeWeather);
    return ctx.scene.leave();
  };
}
