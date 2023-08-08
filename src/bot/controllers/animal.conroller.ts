import { chooseAnimalPanel } from './../buttons/animal.button';
import { Actions } from '@bot/constants/actions.enum';
import { IBotContext } from '@bot/interfaces/context.interface';
import { IAnimalService } from '@bot/services/animals.service';
import { TYPE_ANIMAL_CONTAINERS } from '@container/bot/animals/animalContainer.type';
import { inject, injectable } from 'inversify';

export interface IAnimalController {
  getRandomCat: (ctx: IBotContext) => Promise<void>;
  getRandomDog: (ctx: IBotContext) => Promise<void>;
}

@injectable()
export class AnimalController implements IAnimalController {
  private readonly animalService: IAnimalService;

  constructor(
    @inject(TYPE_ANIMAL_CONTAINERS.AnimalService) animalService: IAnimalService
  ) {
    this.animalService = animalService;
  }

  async getRandomCat(ctx: IBotContext): Promise<void> {
    const result = await this.animalService.getRandmonAnimal(Actions.CAT);
    if (result) {
      const replyMessage = await ctx.reply('Получаем картинку...');
      return await ctx.replyWithPhoto(result, chooseAnimalPanel(Actions.CAT)).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }

  async getRandomDog(ctx: IBotContext): Promise<void> {
    const result = await this.animalService.getRandmonAnimal(Actions.DOG);
    if (result) {
      const replyMessage = await ctx.reply('Получаем картинку...');
      return await ctx.replyWithPhoto(result, chooseAnimalPanel(Actions.DOG)).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }
}
