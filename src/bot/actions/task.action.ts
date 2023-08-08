import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from '@container/bot';
import { ITaskController } from '@bot/controllers';
import { AbstactAction } from '@bot/interfaces';
import { Actions, CommandName } from '@bot/constants';
import { getCommand, catchAsyncFunction } from '@common/helpers';
import { taskMenu } from '@bot/buttons';

@injectable()
export class TaskAction extends AbstactAction {
  private readonly taskController: ITaskController;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskController) taskController: ITaskController
  ) {
    super();
    this.taskController = taskController;
  }

  init(): void {
    this.bot.action(Actions.MY_TASK, (ctx) => {
      catchAsyncFunction(ctx, () => getCommand(CommandName.GET_MY_TASKS, ctx));
    });

    this.bot.action(Actions.TASK, (ctx) => {
      ctx.editMessageText('Меню задачи', taskMenu);
    });

    this.bot.action(Actions.ADD_TASK, (ctx) => {
      getCommand(CommandName.ADD_TASK, ctx);
    });

    this.bot.action(/task_detail\?(.*)/, (ctx) => {
      catchAsyncFunction(ctx, () => this.taskController.getTask(ctx));
    });

    this.bot.action(/delete_task\?(.*)/, (ctx) => {
      catchAsyncFunction(ctx, () => this.taskController.deleteTask(ctx));
    });

    this.bot.action(/un_subscribe_task\?(.*)/, (ctx) => {
      catchAsyncFunction(ctx, () => this.taskController.unSubscribeFromTask(ctx));
    });

    this.bot.action(/subscribe_task\?(.*)/, (ctx) => {
      catchAsyncFunction(ctx, () => this.taskController.subsribeOnTask(ctx));
    });
  }
}
