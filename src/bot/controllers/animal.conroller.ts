import { inject, injectable } from 'inversify';
import { Actions, FETCHING_IMAGE } from '@bot/constants';
import { IBotContext } from '@bot/interfaces';
import { IAnimalService } from '@bot/services';
import { TYPE_ANIMAL_CONTAINERS } from '@container/bot/animals';
import { chooseAnimalPanel } from '@bot/buttons';

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
      const replyMessage = await ctx.reply(FETCHING_IMAGE);
      return await ctx.replyWithPhoto(result, chooseAnimalPanel(Actions.CAT)).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }

  async getRandomDog(ctx: IBotContext): Promise<void> {
    const result = await this.animalService.getRandmonAnimal(Actions.DOG);
    if (result) {
      const replyMessage = await ctx.reply(FETCHING_IMAGE);
      return await ctx.replyWithPhoto(result, chooseAnimalPanel(Actions.DOG)).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }
}
