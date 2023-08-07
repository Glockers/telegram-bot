import { Actions } from 'bot/constants/actions.enum';
import { TWeatherSubscribeEntity } from 'infra/database/entities/weatherSubscribe.entity';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const weatherMenu = Markup.inlineKeyboard([
  [
    Markup.button.callback('Погода', Actions.GET_WEATHER)
  ],
  [
    Markup.button.callback('Подписка на погоду', Actions.SUBSCRIBE_WEATHER)
  ],
  [
    Markup.button.callback('Отписка от погоды', Actions.GET_WEATHER_SUBSCRIBE)
  ],
  [
    Markup.button.callback('Назад', Actions.HELP_MENU)
  ]
]);

export const weatherInfoTask = (subscriptions: TWeatherSubscribeEntity[]): Markup.Markup<InlineKeyboardMarkup> => {
  const buttonTasks = [];
  for (const element of subscriptions) {
    const text = 'unsubscribe_weather?' + JSON.stringify({ id: element.id });
    const title = element.city;
    buttonTasks.push([Markup.button.callback(title, text)]);
  }

  return Markup.inlineKeyboard(buttonTasks);
};
