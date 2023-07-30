import { AbstactCommand } from './command.class';
import { inject, injectable } from 'inversify';
import { TYPE_ANIMAL_CONTAINERS } from 'container/bot/animals/animalContainer.type';
import { IAnimalController } from 'bot/controllers/animal.conroller';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { IBotContext } from 'bot/context/context.interface';
import { CommandHandlers } from 'bot/interfaces/command.interface';

@injectable()
export class AnimalCommand extends AbstactCommand {
  private animalController: IAnimalController;

  constructor(
    @inject(TYPE_ANIMAL_CONTAINERS.AnimalController) animalController: IAnimalController
  ) {
    super();
    this.animalController = animalController;
  }

  initCommands(): void {
    this.catHandler = this.catHandler.bind(this);
    this.dogHandler = this.dogHandler.bind(this);

    this.bot.command([COMMAND_NAME.CAT], (ctx) => this.getCommands()[COMMAND_NAME.CAT]!(ctx));
    this.bot.command([COMMAND_NAME.DOG], (ctx) => this.getCommands()[COMMAND_NAME.DOG]!(ctx));
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [COMMAND_NAME.CAT]: this.catHandler,
      [COMMAND_NAME.DOG]: this.dogHandler
    };
    return commandHandlers;
  }

  private catHandler(ctx: IBotContext): void {
    this.animalController.getRandomCat(ctx);
  }

  private dogHandler(ctx: IBotContext): void {
    this.animalController.getRandomDog(ctx);
  }
}