import { AbstactCommand } from '../interfaces/command.class';
import { injectable } from 'inversify';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { IBotContext } from 'bot/interfaces/context.interface';

@injectable()
export class UnknownCommand extends AbstactCommand {
  getCommands(): CommandHandlers {
    const commandHandlers: CommandHandlers = {
    };
    return commandHandlers;
  }

  initCommands(): void {
    this.bot.on('message', (ctx: IBotContext) => {
      this.uknownHandle(ctx);
    });
  }

  private uknownHandle(ctx: IBotContext): void {
    const unknownCommandText = 'Неизвестная команда. Введите /help для получения списка доступных команд.'; // TODO вынести в константу
    ctx.reply(unknownCommandText);
  }
}
