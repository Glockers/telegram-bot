import { injectable } from 'inversify';
import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

export interface IWeatherController {
  getRandomAnimal: (ctx: Context<Update>) => void
}

@injectable()
export class WeatherController implements IWeatherController {
  getRandomAnimal(ctx: Context<Update>) {

  };
}
