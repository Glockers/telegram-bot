import { AbstactCommand } from '@bot/interfaces/command.class';
import { CommandName } from '@bot/constants/command.enum';
import { IBotContext } from '@bot/interfaces/context.interface';
import { CommandHandlers } from '@bot/interfaces/command.interface';
import { TYPE_COMMAND_CONTAINERS } from '@container/bot/commands/command.type';
import { InversifyContainer } from '@container/inversifyContainer';

export const getCommand = (command: CommandName, ctx: IBotContext): void => {
  let commands = {} as CommandHandlers;
  Object.keys(TYPE_COMMAND_CONTAINERS).forEach((key) => {
    const command = TYPE_COMMAND_CONTAINERS[key as keyof typeof TYPE_COMMAND_CONTAINERS];
    commands = { ...commands, ...InversifyContainer.get<AbstactCommand>(command).getCommands() };
  });

  if (commands[command]) {
    commands[command]?.(ctx);
  } else {
    throw new Error('Неизвестная команда');
  }
};
