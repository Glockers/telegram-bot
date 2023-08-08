import { buttonInfoTask } from './../buttons/task.button';
import { backMenuTask, setTaskPanel } from '@bot/buttons/task.button';
import { AppScenes } from '@bot/constants/scenes.enum';
import { CallbackQueryData, IBotContext } from '@bot/interfaces/context.interface';
import { SubscribeTaskService } from '@bot/services/subscriptionsTask.service';
import { exctractUserIdFromChat, exctractcallbackQueryData } from '@common/helpers/contextHelpers';
import { TYPE_TASK_CONTAINERS } from '@container/bot/task/task.type';
import { inject, injectable } from 'inversify';

export interface ITaskController {
  getMyTask: (ctx: IBotContext) => Promise<void>;
  deleteTask: (ctx: CallbackQueryData) => Promise<void>;
  getTask: (ctx: CallbackQueryData) => Promise<void>;
  subsribeOnTask: (ctx: IBotContext) => Promise<void>;
  unSubscribeFromTask: (ctx: CallbackQueryData) => Promise<void>;
}

@injectable()
export class TaskController implements ITaskController {
  private readonly subscribeTaskService: SubscribeTaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.SubscribeTaskService) subscribeTaskService: SubscribeTaskService
  ) {
    this.subscribeTaskService = subscribeTaskService;
  }

  async getMyTask(ctx: IBotContext): Promise<void> {
    const userID = exctractUserIdFromChat(ctx);
    const tasks = await this.subscribeTaskService.getTasks(userID);
    tasks.length === 0
      ? ctx.reply('У вас нет задач')
      : ctx.editMessageText('Список задач', buttonInfoTask(tasks));
  }

  async getTask(ctx: CallbackQueryData): Promise<void> {
    const queryData = exctractcallbackQueryData(ctx);
    const task = await this.subscribeTaskService.getTaskById(queryData.id);
    const isExistSubscribe = !!await this.subscribeTaskService.getSubscriptionTaskById(task.id);
    ctx.editMessageText(
      '№' + task.id + `\nЗаголовок: ${task.title}\nОписание: ${task.description}`,
      setTaskPanel(isExistSubscribe, queryData.id));
  }

  async deleteTask(ctx: CallbackQueryData): Promise<void> {
    const taskID = exctractcallbackQueryData(ctx);
    const userID = exctractUserIdFromChat(ctx);
    await this.subscribeTaskService.deleteTaskById(taskID, userID) ? ctx.editMessageText('Задача удалена', backMenuTask) : ctx.reply('Задача не была удалена!', backMenuTask);
  }

  async subsribeOnTask(ctx: IBotContext): Promise<void> {
    const userID = exctractUserIdFromChat(ctx);
    const { id } = exctractcallbackQueryData(ctx as CallbackQueryData);
    ctx.scene.session.subscribeTask = {
      taskID: id,
      userID,
      time: new Date()
    };

    ctx.scene.enter(AppScenes.SET_NOTIFICATION_TASK);
  }

  async unSubscribeFromTask(ctx: CallbackQueryData): Promise<void> {
    const { id } = exctractcallbackQueryData(ctx);
    this.subscribeTaskService.unSubFromTask(id);
    ctx.editMessageText('Вы отписались от уведомления задачи', backMenuTask);
  };
}
