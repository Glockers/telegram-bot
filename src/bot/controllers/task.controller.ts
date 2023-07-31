import { buttonInfoTask } from './../buttons/task.button';
import { backMenuTask, setTaskPanel } from 'bot/buttons/task.button';
import { CallbackQueryData, IBotContext } from 'bot/interfaces/context.interface';
import { ITaskService } from 'bot/services/task.service';
import { exctractUserIdFromChat, exctractcallbackQueryData } from 'common/helpers/contextHelpers';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { inject, injectable } from 'inversify';

export interface ITaskController {
  getMyTask: (ctx: IBotContext) => Promise<void>;
  deleteTask: (ctx: CallbackQueryData) => Promise<void>;
  getTask: (ctx: CallbackQueryData) => Promise<void>;
}

@injectable()
export class TaskController implements ITaskController {
  taskService: ITaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
  ) {
    this.taskService = taskService;
  }

  async getMyTask(ctx: IBotContext): Promise<void> {
    const userID = exctractUserIdFromChat(ctx);
    const tasks = await this.taskService.getTasks(userID);
    tasks.length === 0
      ? ctx.reply('У вас нет задач')
      : ctx.reply('Список задач', buttonInfoTask(tasks));
  }

  async getTask(ctx: CallbackQueryData) {
    const queryData = exctractcallbackQueryData(ctx);
    const task = await this.taskService.getTaskById(queryData.id);
    ctx.editMessageText('№' + task.id + `\nЗаголовок: ${task.title}\nОписание: ${task.description}`, setTaskPanel('sub', queryData.id));
  }

  async deleteTask(ctx: CallbackQueryData) {
    const taskID = exctractcallbackQueryData(ctx);
    const userID = exctractUserIdFromChat(ctx);
    await this.taskService.deleteTaskById(taskID, userID) ? ctx.editMessageText('Задача удалена', backMenuTask) : ctx.reply('Задача не была удалена!');
  }
}
