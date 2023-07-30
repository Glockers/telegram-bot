import { ACTION_NAME } from 'bot/constants/actions.enum';
import { IBotContext } from 'bot/context/context.interface';
import { IAnimalService } from 'bot/services/animals.service';
import { TYPE_ANIMAL_CONTAINERS } from 'container/bot/animals/animalContainer.type';
import { inject, injectable } from 'inversify';
import { Markup } from 'telegraf';

export interface IAnimalController {
  getRandomCat: (ctx: IBotContext) => void;
  getRandomDog: (ctx: IBotContext) => void;
}

@injectable()
export class AnimalController implements IAnimalController {
  animalService: IAnimalService;

  constructor(
    @inject(TYPE_ANIMAL_CONTAINERS.AnimalService) animalService: IAnimalService
  ) {
    this.animalService = animalService;
  }

  async getRandomCat(ctx: IBotContext) {
    const result = await this.animalService.getRandmonAnimal(ACTION_NAME.CAT);
    if (result) {
      const replyMessage = await ctx.reply('Получаем картинку...');
      return await ctx.replyWithPhoto(result, Markup.inlineKeyboard([
        [
          Markup.button.callback('Назад в меню', ACTION_NAME.HELP_MENU_SCEBE),
          Markup.button.callback('Далее', ACTION_NAME.CAT)
        ]
      ])).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }

  async getRandomDog(ctx: IBotContext) {
    const result = await this.animalService.getRandmonAnimal(ACTION_NAME.DOG);
    if (result) {
      const replyMessage = await ctx.reply('Получаем картинку...');
      return await ctx.replyWithPhoto(result, Markup.inlineKeyboard([
        [
          Markup.button.callback('Назад', ACTION_NAME.HELP_MENU_SCEBE),
          Markup.button.callback('Далее', ACTION_NAME.DOG)
        ]
      ])).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }
}
