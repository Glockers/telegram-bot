import { CommandName } from 'bot/constants/command.enum';

export function isCommand(text: string): boolean {
  const keys = Object.keys(CommandName);
  const values = keys.map(key => CommandName[key as keyof typeof CommandName]);
  return !!(text.startsWith('/') && values.includes(text.substring(1) as CommandName));
}
