import { inject, injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { ITaskController } from '../controllers/task.controller';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/context/context.interface';

@injectable()
export class TaskCommand extends AbstactCommand {
  taskController: ITaskController;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskController) taskController: ITaskController
  ) {
    super();
    this.taskController = taskController;
  }

  initCommands(): void {
    this.bot.command(COMMAND_NAME.ADD_TASK, ctx =>
      this.getCommands()[COMMAND_NAME.ADD_TASK]!(ctx)
    );
    this.bot.command(COMMAND_NAME.DELETE_TASK, ctx =>
      this.getCommands()[COMMAND_NAME.DELETE_TASK]!(ctx)
    );
    this.bot.command(COMMAND_NAME.GET_MY_TASKS, ctx =>
      this.getCommands()[COMMAND_NAME.GET_MY_TASKS]!(ctx)
    );
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [COMMAND_NAME.ADD_TASK]: this.addTask,
      [COMMAND_NAME.DELETE_TASK]: this.deleteTask,
      [COMMAND_NAME.GET_MY_TASKS]: this.getAllTask
    };
    return commandHandlers;
  }

  private addTask(ctx: IBotContext): void {
    ctx.scene.enter(SCENE.ADD_TASK);
  }

  private deleteTask(ctx: IBotContext): void {
    ctx.scene.enter(SCENE.DELETE_TASK);
  }

  private getAllTask(ctx: IBotContext): void {
    this.taskController.getMyTask(ctx);
  }
}
