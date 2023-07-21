import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { TYPE_WEATHER_CONTAINERS } from 'container/weather/weather.type';
import { ISubscribeController } from 'bot/controllers/subscribe.controller';

@injectable()
export class TaskCommand extends AbstactCommand {
  subscribeController;

  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeController) subscribeController: ISubscribeController
  ) {
    super();
    this.subscribeController = subscribeController;
  }

  handle(): void {
    // this.addTask();
    // this.deleteTask();
    // this.getAllTask();
  }

  // addTask() {
  //   this.bot.command(COMMAND., (ctx) =>
  //   //   ctx.scene.enter(SCENE.)
  //   );
  // }

  // deleteTask() {
  //   this.bot.command(COMMAND., (ctx) =>
  //   //   ctx.scene.enter(SCENE.)
  //   );
  // }

  // getAllTask() {
  //   this.bot.command(COMMAND., (ctx) =>
  //   //   ctx.scene.enter(SCENE.)
  //   );
  // }
}
