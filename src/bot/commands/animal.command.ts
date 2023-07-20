import { AbstactCommand } from './command.class';
import { inject, injectable } from 'inversify';
import { TYPE_ANIMAL_CONTAINERS } from 'container/animals/animalContainer.type';
import { IAnimalController } from 'bot/controllers/animal.conroller';
import { COMMAND } from 'bot/constants/command.enum';

@injectable()
export class AnimalCommand extends AbstactCommand {
  private animalController: IAnimalController;

  constructor(
    @inject(TYPE_ANIMAL_CONTAINERS.AnimalController)
    animalController: IAnimalController
  ) {
    super();
    this.animalController = animalController;
  }

  handle(): void {
    this.animalHandle();
  }

  animalHandle(): void {
    this.bot.command([COMMAND.CAT, COMMAND.DOG], (ctx) =>
      this.animalController.getRandomAnimal(ctx)
    );
  }
}
