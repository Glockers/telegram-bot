import { SCENE } from 'bot/constants/scenes.enum';
import { IBotContext } from 'bot/interfaces/context.interface';
import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { inject, injectable } from 'inversify';
import { TYPE_WEATHER_CONTAINERS } from 'container/bot/weather/weather.type';
import { IWeatherService } from 'bot/services/weather.service';
import { formWeatherReport } from 'common/utils/replyUtil';

@injectable()
export class WeatherScene implements ISceneBehave {
  scene: Scenes.BaseScene<IBotContext>;

  private weatherService: IWeatherService;

  constructor(
    // @inject(TYPE_WEATHER_CONTAINERS.SubscribeService) subscribeService: ISubscribeService
    @inject(TYPE_WEATHER_CONTAINERS.WeatherService) weatherService: IWeatherService

  ) {
    this.weatherService = weatherService;
    this.scene = new Scenes.BaseScene<IBotContext>(SCENE.WEATHER);
    this.init();
  }

  getInstance() {
    return this.scene;
  };

  async getWeather(ctx: IBotContext) {
    await ctx.scene.enter('weather');
  }

  init() {
    this.askAboutCity();
    this.handleWeather();
  }

  private askAboutCity() {
    this.scene.enter((ctx) => {
      ctx.reply('Пришли мне название города');
    });
  }

  private async handleWeather() {
    this.scene.on('text', async (ctx) => {
      const res = await this.weatherService.getWeatherByCity(ctx.message.text);
      if (!res) {
        ctx.reply('Такого города нет! Попробуй еще');
      } else {
        const message = formWeatherReport(res);
        ctx.reply(message);
        ctx.scene.leave();
      }
    });
  }
}
