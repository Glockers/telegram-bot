import { COMMAND_NAME } from 'bot/constants/command.enum';
import { IBotContext } from 'bot/interfaces/context.interface';

export type CommandHandler = (ctx: IBotContext) => void;

export type CommandHandlers = Partial<Record<COMMAND_NAME, CommandHandler>>;
