import { injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';

@injectable()
export class TaskCommand extends AbstactCommand {
  subscribeController;
  constructor(
    @inject(TYPE_WEATHER_CONTAINERS.SubscribeController)
    subscribeController: ISubscribeController
  ) {
    super();
    this.subscribeController = subscribeController;
  }

  handle(): void {
   this.addTask()
   this.deleteTask()
   this.getAllTask()
  }

  addTask() {
    this.bot.command(COMMAND., (ctx) =>
    //   ctx.scene.enter(SCENE.)
    );
  }

  deleteTask() {
    this.bot.command(COMMAND., (ctx) =>
    //   ctx.scene.enter(SCENE.)
    );
  }

  getAllTask() {
    this.bot.command(COMMAND., (ctx) =>
    //   ctx.scene.enter(SCENE.)
    );
  }
}
