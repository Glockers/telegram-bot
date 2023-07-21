import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { IWeatherController } from 'bot/controllers/weather.contoller';
import { COMMAND } from 'bot/constants/command.enum';

@injectable()
export class WeatherCommand extends AbstactCommand {
  private weatherController: IWeatherController;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.WeatherController) weatherController: IWeatherController
  ) {
    super();
    this.weatherController = weatherController;
  }

  handle(): void {
    this.weatherHandler();
  }

  // TODO типизировать
  weatherHandler(): void {
    this.bot.command(COMMAND.WEATHER, (ctx) =>
      this.weatherController.getWeather(ctx)
    );
  }
}
