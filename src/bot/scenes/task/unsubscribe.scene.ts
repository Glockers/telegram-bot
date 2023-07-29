// import { inject, injectable } from 'inversify';
// import { ISceneBehave } from '../scene.type';
// import { Scenes } from 'telegraf';
// import { IBotContext } from 'bot/context/context.interface';
// import { catchAsyncFunction } from 'utils/catchAsync';
// import { exctractUserIdFromChat, extractMessageFromChat } from 'utils/contextHelpers';
// import { SCENE } from 'bot/constants/scenes.enum';

// @injectable()
// export class UnsubscribeTaskScene implements ISceneBehave {
//   scene: Scenes.WizardScene<IBotContext>;

//   taskService: ITaskService;

//   constructor(
//     @inject(TYPE_TASK_CONTAINERS.TaskService) taskService: ITaskService
//   ) {
//     this.taskService = taskService;

//     this.scene = new Scenes.WizardScene<IBotContext>(
//       SCENE.CANCEL_NOTIFICATION_TASK

//     );
//   }

//   getInstance() {
//     return this.scene;
//   }

//   askIDTask = async (ctx: IBotContext) => {
//     ctx.scene.session.addTask = {} as ISceneAddTask;
//     ctx.reply('Введите номер задачии');
//     return ctx.wizard.next();
//   };

//   askDescription = async (ctx: IBotContext) => {
//     const title = extractMessageFromChat(ctx);
//     ctx.scene.session.addTask.title = title;

//     ctx.reply('Введите описание');
//     return ctx.wizard.next();
//   };

//   exctractDescription = async (ctx: IBotContext) => {
//     const description = extractMessageFromChat(ctx);
//     ctx.scene.session.addTask.description = description;

//     return this.handle(ctx);
//   };

//   handle = async (ctx: IBotContext) =>
//     catchAsyncFunction(ctx, () => {
//       const userID = exctractUserIdFromChat(ctx);
//       this.taskService.addTask(ctx.scene.session.addTask, userID);
//       ctx.reply('Задача была добавлена');
//       return ctx.scene.leave();
//     });
// }
