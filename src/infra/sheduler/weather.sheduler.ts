import { IBotContext } from 'bot/interfaces/context.interface';
import { IWeatherService } from 'bot/services/weather.service';
import { TYPE_WEATHER_CONTAINERS } from 'container/bot/weather/weather.type';
import { InversifyContainer } from 'container/inversifyContainer';
import { TYPE_REPOSITORY_CONTAINERS } from 'container/repository/repository.type';
import { WeatherSubscribeRepository } from 'infra/database/repository/weatherSubscribe.repository';
import { Telegraf } from 'telegraf';
import { getCurrentDate } from 'common/utils/dateUtils';
import { Logger } from 'common/utils/logger';
import { formWeatherReport } from 'common/utils/replyUtil';

export const weatherShedulerHandler = async (bot: Telegraf<IBotContext>) => {
  const repository = InversifyContainer.get<WeatherSubscribeRepository>(TYPE_REPOSITORY_CONTAINERS.WeatherSubscribeRepository);
  const weatherService = InversifyContainer.get<IWeatherService>(TYPE_WEATHER_CONTAINERS.WeatherService);
  const subscriptions = await repository.getAllByTime(getCurrentDate());
  let operationsCount = 0;

  for (const element of subscriptions) {
    const res = await weatherService.getWeatherByCity(element.city);
    const message = formWeatherReport(res);
    bot.telegram.sendMessage(element.userID, message);
    operationsCount++;
  }

  Logger.getLogger().info('Рассылку на погоду получило:', operationsCount, 'человек(а)');
};
