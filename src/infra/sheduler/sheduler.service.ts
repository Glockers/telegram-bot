import { IBotContext } from '@bot/interfaces/context.interface';
import { Telegraf } from 'telegraf';
import schedule from 'node-schedule';
import { shedulerConfig } from './sheduler.config';

const shedulerHandler = (bot: Telegraf<IBotContext>): void => {
  shedulerConfig.forEach(element => {
    element(bot);
  });
};

export function initSheduler(bot: Telegraf<IBotContext>): void {
  const rule = new schedule.RecurrenceRule();
  rule.minute = new schedule.Range(0, 59);
  schedule.scheduleJob(rule, () => shedulerHandler(bot));
}
