import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { ITaskController } from '../controllers/task.controller';

@injectable()
export class TaskCommand extends AbstactCommand {
  taskController: ITaskController;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskController) taskController: ITaskController
  ) {
    super();
    this.taskController = taskController;
  }

  handle(): void {
    this.addTask();
    this.deleteTask();
    this.getAllTask();
  }

  addTask() {
    this.bot.command(COMMAND.ADD_TASK, (ctx) =>
      ctx.scene.enter(SCENE.ADD_TASK)
    );
  }

  deleteTask() {
    this.bot.command(COMMAND.DELETE_TASK, (ctx) =>
      ctx.scene.enter(SCENE.DELETE_TASK)
    );
  }

  getAllTask() {
    this.bot.command(COMMAND.GET_MY_TASKS, (ctx) =>
      this.taskController.getMyTask(ctx)
    );
  }
}
