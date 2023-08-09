import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { Actions } from '@bot/constants';

export const helpMenu = Markup.inlineKeyboard([
  [
    Markup.button.callback('Котики', Actions.CAT),
    Markup.button.callback('Cобачки', Actions.DOG)
  ],
  [
    Markup.button.callback('Погода', Actions.WEATHER)
  ],
  [
    Markup.button.callback('Задачи', Actions.TASK)
  ],
  [
    Markup.button.callback('Рекомендация мест', Actions.RECOMMEND_MENU)
  ]
]
);

export const backToMainMenu = (choose: Actions.HELP_MENU | Actions.HELP_MENU_SCEBE): Markup.Markup<InlineKeyboardMarkup> => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('Назад в меню', choose)
    ]
  ]);
};
