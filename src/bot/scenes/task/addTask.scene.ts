import { Scenes } from 'telegraf';
import { inject, injectable } from 'inversify';
import { ISceneBehave, SessionAddTask } from '@bot/scenes';
import { AppScenes, TASK_ADDED, MISSING_TASK_DESCRIPTION, MISSING_TASK_TITLE } from '@bot/constants';
import { ITaskService } from '@bot/services';
import { TYPE_TASK_CONTAINERS } from '@container/bot/task/task.type';
import { IBotContext } from '@bot/interfaces';
import { exctractUserIdFromChat, extractMessageFromChat } from '@common/helpers';
import { backMenuTask } from '@bot/buttons';

@injectable()
export class AddTaskScene implements ISceneBehave {
  private scene: Scenes.WizardScene<IBotContext>;

  private readonly taskService: ITaskService;

  constructor(
    @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
  ) {
    this.taskService = taskService;
    this.scene = new Scenes.WizardScene<IBotContext>(
      AppScenes.ADD_TASK,
      this.askTitle, this.askDescription, this.getAnswerDescription, this.getAnswerDescription
    );
  }

  getInstance(): Scenes.WizardScene<IBotContext> {
    return this.scene;
  }

  askTitle = async (ctx: IBotContext): Promise<void> => {
    ctx.scene.session.addTask = {} as SessionAddTask;
    ctx.reply(MISSING_TASK_TITLE);
    ctx.wizard.next();
  };

  askDescription = async (ctx: IBotContext): Promise<void> => {
    const title = extractMessageFromChat(ctx);
    ctx.scene.session.addTask.title = title;
    ctx.reply(MISSING_TASK_DESCRIPTION);
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
    ctx.reply(TASK_ADDED, backMenuTask);
    this.taskService.addTask(ctx.scene.session.addTask);
    return ctx.scene.leave();
  };
}
