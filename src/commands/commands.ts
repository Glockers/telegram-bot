import { Telegraf } from 'telegraf';
import { StartCommand } from './start.command';
import { HelpCommand } from './help.command';
import { UnknownCommand } from './unknown.command';

// TODO Добавить типизацию
export const getInstanceCommands = (bot: Telegraf) => {
  return [
    new StartCommand(bot),
    new HelpCommand(bot),
    new UnknownCommand(bot)
  ];
};
