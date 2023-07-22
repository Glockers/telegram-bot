import { SCENE } from 'bot/constants/scenes.enum';
import { IBotContext } from 'bot/context/context.interface';
import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { convertDateToString } from 'utils/dateUtils';
import { inject, injectable } from 'inversify';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { IWeatherService } from 'bot/services/weather.service';

// export const weatherScene = new Scenes.BaseScene<IBotContext>(SCENE.WEATHER);

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
        // TODO вынести
        const CELSUS = (res.temp - 273.15).toFixed(2);
        const formattedWeather = ` 
        Погода в ${res.name}, ${convertDateToString(
          new Date()
        )}\nCкорость ветра: ${res.windSpeed.toFixed(
          2
        )} м/c.\nТемпература: ${CELSUS}
        `;
        ctx.reply(formattedWeather);
        ctx.scene.leave();
      }
    });
  }
}
