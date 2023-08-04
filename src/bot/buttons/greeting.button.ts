import { ACTION_NAME } from 'bot/constants/actions.enum';
import { Markup } from 'telegraf';

export const helpMenu = Markup.inlineKeyboard([
  [
    Markup.button.callback('Котики', ACTION_NAME.CAT),
    Markup.button.callback('Cобачки', ACTION_NAME.DOG)
  ],
  [
    Markup.button.callback('Погода', ACTION_NAME.WEATHER)
  ],
  [
    Markup.button.callback('Задачи', ACTION_NAME.TASK)
  ],
  [
    Markup.button.callback('Рекомендация мест', ACTION_NAME.RECOMMEND_MENU)
  ]
]
);

export const backToMainMenu = (choose: ACTION_NAME.HELP_MENU | ACTION_NAME.HELP_MENU_SCEBE) => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('Назад в меню', choose)
    ]
  ]);
};
