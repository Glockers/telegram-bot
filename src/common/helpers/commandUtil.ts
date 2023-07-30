import { AbstactCommand } from 'bot/commands/command.class';
import { COMMAND_NAME } from 'bot/constants/command.enum';
import { IBotContext } from 'bot/context/context.interface';
import { CommandHandlers } from 'bot/interfaces/command.interface';
import { TYPE_COMMAND_CONTAINERS } from 'container/bot/commands/command.type';
import { InversifyContainer } from 'container/inversifyContainer';

export const getCommand = (command: COMMAND_NAME, ctx: IBotContext): void => {
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
