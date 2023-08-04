import { COMMAND_NAME } from 'bot/constants/command.enum';

export function isCommand(text: string): boolean {
  const keys = Object.keys(COMMAND_NAME);
  const values = keys.map(key => COMMAND_NAME[key as keyof typeof COMMAND_NAME]);
  return !!(text.startsWith('/') && values.includes(text.substring(1) as COMMAND_NAME));
}
