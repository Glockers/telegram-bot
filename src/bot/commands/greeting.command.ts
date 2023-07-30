import { COMMAND_NAME } from 'bot/constants/command.enum';
import { AbstactCommand } from './command.class';
import { injectable } from 'inversify';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/context/context.interface';
import { Markup } from 'telegraf';
import { getCommand } from 'common/helpers/commandUtil';
import { SCENE } from 'bot/constants/scenes.enum';
import { ACTION_NAME } from 'bot/constants/actions.enum';

@injectable()
export class GreetingCommand extends AbstactCommand {
  initCommands(): void {
    this.bot.command(COMMAND_NAME.START, (ctx) =>
      this.getCommands()[COMMAND_NAME.START]!(ctx)
    );

    this.bot.command(COMMAND_NAME.HELP, (ctx) =>
      this.getCommands()[COMMAND_NAME.HELP]!(ctx));

    this.bot.action(ACTION_NAME.CAT, (ctx) => {
      getCommand(COMMAND_NAME.CAT, ctx);
    });

    this.bot.action(ACTION_NAME.DOG, (ctx) => {
      getCommand(COMMAND_NAME.DOG, ctx);
    });

    this.bot.action(ACTION_NAME.WEATHER, (ctx) => {
      ctx.editMessageText('Меню погода', Markup.inlineKeyboard([
        [
          Markup.button.callback('Погода', 'get_weather')
        ],
        [
          Markup.button.callback('Подписка на погоду', 'subscribe_weather')
        ],
        [
          Markup.button.callback('Отписка от погоды', 'subscribe_weather')
        ],
        [
          Markup.button.callback('Назад', ACTION_NAME.HELP_MENU)
        ]
      ]));
    });

    this.bot.action(ACTION_NAME.HELP_MENU, ctx => {
      ctx.editMessageText('This is help message!', Markup.inlineKeyboard([
        [
          Markup.button.callback('Котики', ACTION_NAME.CAT),
          Markup.button.callback('Cобачки', ACTION_NAME.DOG)
        ],
        [
          Markup.button.callback('Погода', ACTION_NAME.WEATHER)
        ],
        [
          Markup.button.callback('Задачи', 'order')
        ],
        [
          Markup.button.callback('Достопремичательности', 'order')
        ]
      ]
      ));
    });

    this.bot.action(ACTION_NAME.HELP_MENU_SCEBE, ctx => {
      ctx.scene.leave();
      ctx.scene.enter(SCENE.HELP);
    });

    this.bot.action('get_weather', ctx => {
      getCommand(COMMAND_NAME.WEATHER, ctx);
    });

    this.bot.action('subscribe_weather', ctx => {
      getCommand(COMMAND_NAME.SUBSCRIBE, ctx);
    });

    this.bot.action(ACTION_NAME.TASK, (ctx) => {
      ctx.reply('Меню задачи', Markup.inlineKeyboard([
        [
          Markup.button.callback('Мои задачи', 'my_task')
        ],
        [
          Markup.button.callback('Добавь задачу', 'add_task')
        ],
        [
          Markup.button.callback('Отписка от погоды', 'subscribe_weather')
        ]
      ]));
    });
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [COMMAND_NAME.HELP]: this.helpHandle,
      [COMMAND_NAME.START]: this.startHandle
    };
    return commandHandlers;
  }

  private startHandle(ctx: IBotContext): void {
    ctx.reply('Welcome!');
  }

  private helpHandle(ctx: IBotContext): void {
    ctx.scene.enter(SCENE.HELP);
  }
}
