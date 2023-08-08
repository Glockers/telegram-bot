import { Scenes } from 'telegraf';
import { inject, injectable } from 'inversify';
import { ISceneBehave } from '@bot/scenes';
import { AppScenes } from '@bot/constants';
import { IBotContext } from '@bot/interfaces';
import { TYPE_WEATHER_CONTAINERS } from '@container/bot/weather';
import { IWeatherService } from '@bot/services';
import { formWeatherReport } from '@common/utils';

@injectable()
export class WeatherScene implements ISceneBehave {
  private readonly scene: Scenes.BaseScene<IBotContext>;

  private readonly weatherService: IWeatherService;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.WeatherService) weatherService: IWeatherService
  ) {
    this.weatherService = weatherService;
    this.scene = new Scenes.BaseScene<IBotContext>(AppScenes.WEATHER);
    this.init();
  }

  getInstance(): Scenes.BaseScene<IBotContext> {
    return this.scene;
  };

  async getWeather(ctx: IBotContext): Promise<void> {
    await ctx.scene.enter('weather');
  }

  init(): void {
    this.askAboutCity();
    this.handleWeather();
  }

  private askAboutCity(): void {
    this.scene.enter((ctx) => {
      ctx.reply('Пришли мне название города');
    });
  }

  private async handleWeather(): Promise<void> {
    this.scene.on('text', async (ctx) => {
      const res = await this.weatherService.getWeatherByCity(ctx.message.text);
      if (!res) {
        ctx.reply('Такого города нет! Попробуй еще');
      } else {
        ctx.reply(formWeatherReport(res));
        ctx.scene.leave();
      }
    });
  }
}
