import { injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/context/context.interface';

@injectable()
export class SubscribeCommand extends AbstactCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(
  ) {
    super();
  }

  initCommands(): void {
    this.bot.command(COMMAND_NAME.SUBSCRIBE, (ctx) =>
      this.getCommands()[COMMAND_NAME.SUBSCRIBE]!(ctx)
    );

    this.bot.command(COMMAND_NAME.UNSUBSCRIBE, (ctx) =>
      this.getCommands()[COMMAND_NAME.UNSUBSCRIBE]!(ctx)
    );
  }

  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
      [COMMAND_NAME.SUBSCRIBE]: this.subscribeOnWeather,
      [COMMAND_NAME.UNSUBSCRIBE]: this.unsubscribeFromWeather
    };
    return commandHandlers;
  }

  private subscribeOnWeather(ctx: IBotContext): void {
    ctx.scene.enter(SCENE.SUBSCRIBE_ON_WEATHER);
  }

  private unsubscribeFromWeather(ctx: IBotContext): void {
    ctx.scene.enter(SCENE.UNSUBSCRIBE_FROM_WEATHER);
  }

  // subscribeOnTask(): void {
  //   this.bot.command(COMMAND.SET_NOTIFICATION_TASK, (ctx) =>
  //     ctx.scene.enter(SCENE.SET_NOTIFICATION_TASK)
  //   );
  // }

  // unSubscribeFromTask(): void {
  //   this.bot.command(COMMAND.CANCEL_NOTIFICATION_TASK, (ctx) =>
  //     ctx.scene.enter(SCENE.CANCEL_NOTIFICATION_TASK)
  //   );
  // }
}
