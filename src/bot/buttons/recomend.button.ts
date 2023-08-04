import { ACTION_NAME } from 'bot/constants/actions.enum';
import { Markup } from 'telegraf';

export const menuRecomend = Markup.inlineKeyboard([
  [
    Markup.button.callback('Рекомандация событий', ACTION_NAME.CAT)
  ],
  [
    Markup.button.callback('Рекомандация достопремичательностей', ACTION_NAME.CAT)
  ],
  [
    Markup.button.callback('Назад', ACTION_NAME.HELP_MENU)
  ]
]);
