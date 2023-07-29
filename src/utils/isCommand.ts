import { COMMAND } from 'bot/constants/command.enum';

export function isCommand(text: string): boolean {
  const keys = Object.keys(COMMAND);
  const values = keys.map(key => COMMAND[key as keyof typeof COMMAND]);
  return !!(text.startsWith('/') && values.includes(text.substring(1) as COMMAND));
}
