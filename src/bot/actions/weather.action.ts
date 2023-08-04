import { weatherMenu } from 'bot/buttons/weather.button';
import { ACTION_NAME } from 'bot/constants/actions.enum';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { IWeatherlController } from 'bot/controllers/weather.controller';
import { AbstactAction } from 'bot/interfaces/actions.class';
import { getCommand } from 'common/helpers/commandUtil';
import { TYPE_WEATHER_CONTAINERS } from 'container/bot/weather/weather.type';
import { inject, injectable } from 'inversify';

@injectable()
export class WeatherAction extends AbstactAction {
  weatherController: IWeatherlController;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.WeatherController) weatherController: IWeatherlController
  ) {
    super();
    this.weatherController = weatherController;
  }

  init() {
    this.bot.action(ACTION_NAME.WEATHER, (ctx) => {
      ctx.editMessageText('Меню погода', weatherMenu);
    });

    this.bot.action(ACTION_NAME.GET_WEATHER, ctx => {
      getCommand(COMMAND_NAME.WEATHER, ctx);
    });

    this.bot.action(ACTION_NAME.SUBSCRIBE_WEATHER, ctx => {
      getCommand(COMMAND_NAME.SUBSCRIBE, ctx);
    });

    this.bot.action(ACTION_NAME.GET_WEATHER_SUBSCRIBE, ctx => {
      this.weatherController.getAllWeatherSubscribs(ctx);
    });

    this.bot.action(/unsubscribe_weather\?(.*)/, (ctx) => {
      this.weatherController.deleteSubscribe(ctx);
    });
  }
}
