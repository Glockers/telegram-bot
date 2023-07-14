import { AbstactCommand } from './command.class';
import { inject, injectable } from 'inversify';
import { TYPE_ANIMAL_CONTAINERS } from 'container/animals/animalContainer.type';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';
import { IBot } from 'bot/bot';
import { IAnimalController } from 'bot/controllers/animal.conroller';

const commnads = ['dog', 'cat'];

@injectable()
export class AnimalCommand extends AbstactCommand {
  private animalController: IAnimalController;

  constructor(
    @inject(TYPE_ANIMAL_CONTAINERS.AnimalController) animalController: IAnimalController,
    @inject(TYPE_BOT_CONTAINERS.Bot) bot: IBot
  ) {
    super(bot.getInstance());
    this.animalController = animalController;
  }

  handle(): void {
    this.animalHandle();
  }

  // TODO типизировать
  animalHandle(): void {
    this.bot.command(commnads, (ctx) => this.animalController.getRandomAnimal(ctx));
  }
}
