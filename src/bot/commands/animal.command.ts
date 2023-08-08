import { inject, injectable } from 'inversify';
import { TYPE_ANIMAL_CONTAINERS } from '@container/bot/animals';
import { IAnimalController } from '@bot/controllers';
import { IBotContext, AbstactCommand, CommandHandlers } from '@bot/interfaces';
import { CommandName } from '@bot/constants';

@injectable()
export class AnimalCommand extends AbstactCommand {
  private readonly animalController: IAnimalController;

  constructor(
    @inject(TYPE_ANIMAL_CONTAINERS.AnimalController) animalController: IAnimalController
  ) {
    super();
    this.animalController = animalController;
  }

  initCommands(): void {
    this.catHandler = this.catHandler.bind(this);
    this.dogHandler = this.dogHandler.bind(this);

    this.bot.command([CommandName.CAT], (ctx) => this.getCommands()[CommandName.CAT]!(ctx));
    this.bot.command([CommandName.DOG], (ctx) => this.getCommands()[CommandName.DOG]!(ctx));
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [CommandName.CAT]: this.catHandler,
      [CommandName.DOG]: this.dogHandler
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
