import { inject, injectable } from 'inversify';
import { backMenuTask, setTaskPanel, buttonInfoTask } from '@bot/buttons';
import {
  AppScenes, DELETED_TASK,
  NO_TASKS, TASK_LIST,
  TASK_NOT_REMOVED, UNSUBSCRIBED_FROM_TASK
} from '@bot/constants';
import { CallbackQueryData, IBotContext } from '@bot/interfaces';
import { SubscribeTaskService } from '@bot/services';
import { exctractUserIdFromChat, exctractcallbackQueryData } from '@common/helpers';
import { TYPE_TASK_CONTAINERS } from '@container/bot/task/task.type';

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
      ? ctx.reply(NO_TASKS)
      : ctx.reply(TASK_LIST, buttonInfoTask(tasks));
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
    await this.subscribeTaskService.deleteTaskById(taskID, userID)
      ? ctx.editMessageText(DELETED_TASK, backMenuTask)
      : ctx.reply(TASK_NOT_REMOVED, backMenuTask);
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
    ctx.editMessageText(UNSUBSCRIBED_FROM_TASK, backMenuTask);
  };
}
