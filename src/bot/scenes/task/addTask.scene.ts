import { Markup, Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { SCENE } from 'bot/constants/scenes.enum';
import { ITaskService } from 'bot/services/task.service';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { IBotContext } from 'bot/context/context.interface';
import { exctractUserIdFromChat, extractMessageFromChat } from 'utils/contextHelpers';
import { catchAsyncFunction } from 'utils/catchAsync';
import { ISceneAddTask } from './task.interface';
import { convertStringToDate } from 'utils/dateUtils';

@injectable()
export class AddTaskScene implements ISceneBehave {
  scene: Scenes.WizardScene<IBotContext>;

  taskService: ITaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
  ) {
    this.taskService = taskService;

    this.scene = new Scenes.WizardScene<IBotContext>(
      SCENE.ADD_TASK,
      this.askTitle,
      this.askDescription,
      this.askReminder,
      this.exctractData
    );

    this.scene.action('cancelRemind', (ctx, next: any) => {
      next();
    });
  }

  getInstance() {
    return this.scene;
  }

  askTitle = async (ctx: IBotContext) => {
    ctx.scene.session.addTask = {} as ISceneAddTask;
    ctx.reply('Введите заголовок задачи');
    return ctx.wizard.next();
  };

  askDescription = async (ctx: IBotContext) => {
    const title = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.title = title;

    ctx.reply('Введите описание');
    return ctx.wizard.next();
  };

  askReminder = async (ctx: IBotContext) => {
    const description = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.description = description;
    ctx.reply('Напомнить о задаче?', Markup.inlineKeyboard([
      Markup.button.callback('Да', 'confirmRemind'),
      Markup.button.callback('Нет', 'cancelRemind')
    ]));

    this.scene.action('confirmRemind', (ctx) => {
      ctx.reply('Пришли время когда нужно сообщить');
    });
  };

  exctractData = async (ctx: IBotContext) => {
    const time = ctx?.message ? extractMessageFromChat(ctx) : null;
    if (time) {
      const resConverting = convertStringToDate(time);
      if (!resConverting) throw new Error('Введена неверно дата!');
    }
    return this.handle(ctx);
  };

  handle = async (ctx: IBotContext) =>
    catchAsyncFunction(ctx, () => {
      const userID = exctractUserIdFromChat(ctx);
      this.taskService.addTask(ctx.scene.session.addTask, userID);
      ctx.reply('Задача была добавлена');
      return ctx.scene.leave();
    });
}
