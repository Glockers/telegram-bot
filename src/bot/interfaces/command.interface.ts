import { CommandName } from '@bot/constants';
import { IBotContext } from '@bot/interfaces';

export type CommandHandler = (ctx: IBotContext) => void;

export type CommandHandlers = Partial<Record<CommandName, CommandHandler>>;
