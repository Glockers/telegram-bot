import { Scenes } from 'telegraf';
import { ISceneBehave } from '../scene.type';
import { SCENE } from 'bot/constants/scenes.enum';
import { ITaskService } from 'bot/services/task.service';
import { inject, injectable } from 'inversify';
import { TYPE_TASK_CONTAINERS } from 'container/bot/task/task.type';
import { IBotContext } from 'bot/interfaces/context.interface';
import { exctractUserIdFromChat, extractMessageFromChat } from 'common/helpers/contextHelpers';
import { ISceneAddTask } from './task.interface';
import { backMenuTask } from 'bot/buttons/task.button';

@injectable()
export class AddTaskScene implements ISceneBehave {
  private scene: Scenes.WizardScene<IBotContext>;

  private readonly taskService: ITaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
  ) {
    this.taskService = taskService;
    this.scene = new Scenes.WizardScene<IBotContext>(
      SCENE.ADD_TASK,
      this.askTitle, this.askDescription, this.getAnswerDescription, this.getAnswerDescription
    );
  }

  getInstance(): Scenes.WizardScene<IBotContext> {
    return this.scene;
  }

  askTitle = async (ctx: IBotContext): Promise<void> => {
    ctx.scene.session.addTask = {} as ISceneAddTask;
    ctx.reply('Введите заголовок задачи');
    ctx.wizard.next();
  };

  askDescription = async (ctx: IBotContext): Promise<void> => {
    const title = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.title = title;
    ctx.reply('Введите описание');
    ctx.wizard.next();
  };

  getAnswerDescription = async (ctx: IBotContext): Promise<void> => {
    const userID = exctractUserIdFromChat(ctx);
    ctx.scene.session.addTask.userID = userID;
    const message = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.description = message;
    this.handle(ctx);
  };

  handle = async (ctx: IBotContext): Promise<void> => {
    ctx.reply('Задача была добавлена', backMenuTask);
    this.taskService.addTask(ctx.scene.session.addTask);
    return ctx.scene.leave();
  };
}
