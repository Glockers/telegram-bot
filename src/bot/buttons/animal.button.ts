import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { Actions } from '@bot/constants';

export const chooseAnimalPanel = (animal: Actions.DOG | Actions.CAT): Markup.Markup<InlineKeyboardMarkup> => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('Назад', Actions.HELP_MENU_SCEBE),
      Markup.button.callback('Далее', animal)
    ]
  ]);
};
