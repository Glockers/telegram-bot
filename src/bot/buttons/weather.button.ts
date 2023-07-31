import { ACTION_NAME } from 'bot/constants/actions.enum';
import { TWeatherSubscribeEntity } from 'infra/database/entities/weatherSubscribe.entity';
import { Markup } from 'telegraf';

export const weatherMenu = Markup.inlineKeyboard([
  [
    Markup.button.callback('Погода', ACTION_NAME.GET_WEATHER)
  ],
  [
    Markup.button.callback('Подписка на погоду', ACTION_NAME.SUBSCRIBE_WEATHER)
  ],
  [
    Markup.button.callback('Отписка от погоды', ACTION_NAME.GET_WEATHER_SUBSCRIBE)
  ],
  [
    Markup.button.callback('Назад', ACTION_NAME.HELP_MENU)
  ]
]);

export const weatherInfoTask = (subscriptions: TWeatherSubscribeEntity[]) => {
  const buttonTasks = [];
  for (const element of subscriptions) {
    const text = 'unsubscribe_weather?' + JSON.stringify({ id: element.id });
    const title = element.city;
    buttonTasks.push([Markup.button.callback(title, text)]);
  }

  return Markup.inlineKeyboard(buttonTasks);
};
