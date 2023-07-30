import { IBotContext } from 'bot/context/context.interface';
import { ITaskService } from 'bot/services/task.service';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { inject, injectable } from 'inversify';
import { exctractUserIdFromChat } from 'common/helpers/contextHelpers';

export interface ITaskController {
  getMyTask: (ctx: IBotContext) => Promise<void>;
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
    const task = await this.taskService.getTasks(userID);
    let message = '';

    for (const element of task) {
      message += `Задача: ${element.id}\nНазвание: ${element.title}\nОписание: ${element.description}\n-----------------------\n\n`;
    }

    if (!message) ctx.reply('У вас нет задач!');
    else ctx.reply(message);
  }
}
