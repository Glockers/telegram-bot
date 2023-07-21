import { IBotContext } from 'bot/context/context.interface';
import { weatherScene } from 'bot/scenes/weather/weather.scene';
import { IWeatherService } from 'bot/services/weather.service';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { inject, injectable } from 'inversify';
import { Scenes } from 'telegraf';
import { convertDateToString } from 'utils/dateUtils';

export interface IWeatherController {
  getWeather: (ctx: IBotContext) => void;
  getInstanceScene: () => Scenes.BaseScene<IBotContext>;
}

@injectable()
export class WeatherController implements IWeatherController {
  private weatherService: IWeatherService;

  private weatherScene: Scenes.BaseScene<IBotContext>;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.WeatherService)
    weatherService: IWeatherService
  ) {
    this.weatherService = weatherService;
    this.weatherScene = weatherScene;
    this.init();
  }

  async getWeather(ctx: IBotContext) {
    await ctx.scene.enter('weather');
  }

  init() {
    this.askAboutCity();
    this.handleWeather();
  }

  private askAboutCity() {
    this.weatherScene.enter((ctx) => {
      ctx.reply('Пришли мне название города');
    });

    this.weatherScene.enter((ctx) => {
      ctx.reply('Пришли мне название города');
    });
  }

  private async handleWeather() {
    this.weatherScene.on('text', async (ctx) => {
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

  getInstanceScene() {
    return this.weatherScene;
  }
}
