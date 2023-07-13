import { Telegraf } from 'telegraf';
import { GreetingCommand } from './greeting.command';
import { UnknownCommand } from './unknown.command';
import { AnimalCommand } from './animal.command';

// TODO Добавить типизацию
// TODO поменять DI
export const getInstanceCommands = (bot: Telegraf) => {
  const commands = [
    new GreetingCommand(bot),
    new AnimalCommand(bot)
  ];

  return [...commands, new UnknownCommand(bot)];
};
