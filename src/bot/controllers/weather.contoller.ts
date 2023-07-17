import { IWeatherService } from 'bot/services/weather.service';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { inject, injectable } from 'inversify';
import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export interface IWeatherController {
  getWeather: (ctx: Context<Update>) => void,
  deleteWeather: (ctx: Context<Update>) => void,
  subscibeWeather: (ctx: Context<Update>) => void
}

@injectable()
export class WeatherController implements IWeatherController {
  private weatherService: IWeatherService;

  constructor(@inject(TYPE_WEATHER_CONTAINERS.WeatherService) weatherService: IWeatherService) {
    this.weatherService = weatherService;
  }

  getWeather(ctx: Context<Update>) {
    console.log(ctx.message);
  };

  deleteWeather(ctx: Context<Update>) {
    console.log(ctx.message);
  }

  subscibeWeather(ctx: Context<Update>) {
    console.log(ctx.message);
  }
}
