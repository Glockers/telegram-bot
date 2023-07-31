import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { ITaskController } from 'bot/controllers/task.controller';
import { AbstactAction } from 'bot/interfaces/actions.class';
import { ACTION_NAME } from 'bot/constants/actions.enum';
import { getCommand } from 'common/helpers/commandUtil';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { taskMenu } from 'bot/buttons/task.button';

@injectable()
export class TaskAction extends AbstactAction {
  private taskController: ITaskController;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskController) taskController: ITaskController
  ) {
    super();
    this.taskController = taskController;
  }

  init() {
    this.bot.action(/task_detail\?(.*)/, (ctx) => {
      this.taskController.getTask(ctx);
    });

    this.bot.action(/delete_task\?(.*)/, (ctx) => {
      this.taskController.deleteTask(ctx);
    });

    this.bot.action(ACTION_NAME.MY_TASK, (ctx) => {
      getCommand(COMMAND_NAME.GET_MY_TASKS, ctx);
    });

    this.bot.action(ACTION_NAME.TASK, (ctx) => {
      ctx.editMessageText('Меню задачи', taskMenu);
    });

    this.bot.action(ACTION_NAME.ADD_TASK, (ctx) => {
      getCommand(COMMAND_NAME.ADD_TASK, ctx);
    });
  }
}
