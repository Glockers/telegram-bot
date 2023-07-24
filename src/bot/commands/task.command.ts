import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { TYPE_WEATHER_CONTAINERS } from 'container/bot/weather/weather.type';
import { ISubscribeController } from 'bot/controllers/subscribe.controller';
import { COMMAND } from 'bot/constants/command.enum';

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
    this.addTask();
    this.deleteTask();
    this.getAllTask();
  }

  addTask() {
    this.bot.command(COMMAND.ADD_TASK, (ctx) =>
      console.log('add task')
    );
  }

  deleteTask() {
    this.bot.command(COMMAND.REMOOVE_TASK, (ctx) =>
      console.log('remoove task')

    );
  }

  getAllTask() {
    this.bot.command(COMMAND.GET_TASKS, (ctx) =>
      console.log('getAllTask')
    );
  }
}
