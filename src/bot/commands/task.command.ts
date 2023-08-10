import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from '@container/bot/task';
import { AbstactCommand, CommandHandlers, IBotContext } from '@bot/interfaces';
import { AppScenes, CommandName } from '@bot/constants';
import { ITaskController } from '@bot/controllers';

@injectable()
export class TaskCommand extends AbstactCommand {
  private readonly taskController: ITaskController;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskController) taskController: ITaskController
  ) {
    super();
    this.taskController = taskController;
  }

  initCommands(): void {
    this.getMyTasks = this.getMyTasks.bind(this);

    this.bot.command(CommandName.ADD_TASK, ctx =>
      this.getCommands()[CommandName.ADD_TASK]!(ctx)
    );
    this.bot.command(CommandName.DELETE_TASK, ctx =>
      this.getCommands()[CommandName.DELETE_TASK]!(ctx)
    );
    this.bot.command(CommandName.GET_MY_TASKS, ctx =>
      this.getCommands()[CommandName.GET_MY_TASKS]!(ctx)
    );
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [CommandName.ADD_TASK]: this.addTask,
      [CommandName.GET_MY_TASKS]: this.getMyTasks
    };
    return commandHandlers;
  }

  private addTask(ctx: IBotContext): void {
    ctx.scene.enter(AppScenes.ADD_TASK);
  }

  private getMyTasks(ctx: IBotContext): void {
    this.taskController.getMyTask(ctx);
  }
}
