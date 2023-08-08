import { injectable } from 'inversify';
import { CommandHandlers, IBotContext, AbstactCommand } from '@bot/interfaces';

@injectable()
export class UnknownCommand extends AbstactCommand {
  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
    };
    return commandHandlers;
  }

  initCommands(): void {
    // TODO DELE ANY
    this.bot.on('message', (ctx: any): void => {
      this.uknownHandle(ctx);
    });
  }

  private uknownHandle(ctx: IBotContext): void {
    const unknownCommandText = 'Неизвестная команда. Введите /help для получения списка доступных команд.'; // TODO вынести в константу
    ctx.reply(unknownCommandText);
  }
}
