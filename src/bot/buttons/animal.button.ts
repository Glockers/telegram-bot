import { ACTION_NAME } from 'bot/constants/actions.enum';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const chooseAnimalPanel = (animal: ACTION_NAME.DOG | ACTION_NAME.CAT): Markup.Markup<InlineKeyboardMarkup> => {
  return Markup.inlineKeyboard([
    [
      Markup.button.callback('Назад', ACTION_NAME.HELP_MENU_SCEBE),
      Markup.button.callback('Далее', animal)
    ]
  ]);
};
