import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { IBot } from 'bot/bot';
import { TYPE_BOT_CONTAINERS } from 'container/bot/botContainer.type';

@injectable()
export class WeatherCommand extends AbstactCommand {
  // private weatherController: IAnimalController;

  constructor(
    // @inject(TYPE_ANIMAL_CONTAINERS.AnimalController) animalController: IAnimalController,
    @inject(TYPE_BOT_CONTAINERS.Bot) bot: IBot
  ) {
    super(bot.getInstance());
    // this.animalController = animalController;
  }

  handle(): void {
    this.weatherHandler();
  }

  // TODO типизировать
  weatherHandler(): void {
    this.bot.command('/weather', (ctx) => {
      /*
        this write code
      */
    });
  }
}
