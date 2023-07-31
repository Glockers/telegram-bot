import { chooseAnimalPanel } from './../buttons/animal.button';
import { ACTION_NAME } from 'bot/constants/actions.enum';
import { IBotContext } from 'bot/interfaces/context.interface';
import { IAnimalService } from 'bot/services/animals.service';
import { TYPE_ANIMAL_CONTAINERS } from 'container/bot/animals/animalContainer.type';
import { inject, injectable } from 'inversify';

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
      return await ctx.replyWithPhoto(result, chooseAnimalPanel(ACTION_NAME.CAT)).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }

  async getRandomDog(ctx: IBotContext) {
    const result = await this.animalService.getRandmonAnimal(ACTION_NAME.DOG);
    if (result) {
      const replyMessage = await ctx.reply('Получаем картинку...');
      return await ctx.replyWithPhoto(result, chooseAnimalPanel(ACTION_NAME.DOG)).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }
}
