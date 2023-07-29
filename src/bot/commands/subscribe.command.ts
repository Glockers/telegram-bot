import { injectable } from 'inversify';
import { AbstactCommand } from './command.class';
import { COMMAND } from 'bot/constants/command.enum';
import { SCENE } from 'bot/constants/scenes.enum';

@injectable()
export class SubscribeCommand extends AbstactCommand {
  // eslint-disable-next-line no-useless-constructor
  constructor(
  ) {
    super();
  }

  handle(): void {
    this.subscribeOnWeather();
    this.unsubscribeFromWeather();
  }

  subscribeOnWeather(): void {
    this.bot.command(COMMAND.SUBSCRIBE, (ctx) =>
      ctx.scene.enter(SCENE.SUBSCRIBE_ON_WEATHER)
    );
  }

  unsubscribeFromWeather(): void {
    this.bot.command(COMMAND.UNSUBSCRIBE, (ctx) =>
      ctx.scene.enter(SCENE.UNSUBSCRIBE_FROM_WEATHER)
    );
  }

  // subscribeOnTask(): void {
  //   this.bot.command(COMMAND.SET_NOTIFICATION_TASK, (ctx) =>
  //     ctx.scene.enter(SCENE.SET_NOTIFICATION_TASK)
  //   );
  // }

  unSubscribeFromTask(): void {
    this.bot.command(COMMAND.CANCEL_NOTIFICATION_TASK, (ctx) =>
      ctx.scene.enter(SCENE.CANCEL_NOTIFICATION_TASK)
    );
  }
}
