import { Markup } from 'telegraf';
import { Actions } from '@bot/constants';

export const menuRecomend = Markup.inlineKeyboard([
  [
    Markup.button.callback('Местные кафе', Actions.RECOMMEND_CAFE)
  ],
  [
    Markup.button.callback('Театры и развлечения', Actions.RECOMMEND_THEATRES_AND_ENTERTAINMENTS)
  ],
  [
    Markup.button.callback('Магазины', Actions.RECOMMEND_SHOPS)
  ],
  [
    Markup.button.callback('Банки', Actions.RECOMMEND_BANK)
  ],
  [
    Markup.button.callback('Достопремичательности', Actions.RECOMMEND_ATTRACTIONS)
  ],
  [
    Markup.button.callback('Назад', Actions.HELP_MENU)
  ]
]);
