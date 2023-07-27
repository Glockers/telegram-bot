import { IBotContext } from 'bot/context/context.interface';
import { IAnimalService } from 'bot/services/animals.service';
import { TYPE_ANIMAL_CONTAINERS } from 'container/bot/animals/animalContainer.type';
import { inject, injectable } from 'inversify';
import { extractMessageFromChat } from 'utils/contextHelpers';

export interface IAnimalController {
  getRandomAnimal: (ctx: IBotContext) => void;
}

@injectable()
export class AnimalController implements IAnimalController {
  animalService: IAnimalService;

  constructor(
    @inject(TYPE_ANIMAL_CONTAINERS.AnimalService) animalService: IAnimalService
  ) {
    this.animalService = animalService;
  }

  async getRandomAnimal(ctx: IBotContext) {
    const message = extractMessageFromChat(ctx);
    const result = await this.animalService.getRandmonAnimal(message);
    if (result) {
      const replyMessage = await ctx.reply('Получаем картинку...');
      return await ctx.replyWithPhoto(result).then(() => {
        ctx.deleteMessage(replyMessage.message_id);
      });
    }
  }
}
