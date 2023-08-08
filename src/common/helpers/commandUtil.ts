import { AbstactCommand, IBotContext, CommandHandlers } from '@bot/interfaces';
import { CommandName } from '@bot/constants';
import { TYPE_COMMAND_CONTAINERS } from '@container/bot/commands';
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
