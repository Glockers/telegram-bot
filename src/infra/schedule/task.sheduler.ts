import { Telegraf } from 'telegraf';
import { IBotContext } from '@bot/interfaces';
import { getCurrentDate, Logger } from '@common/utils';
import { InversifyContainer } from '@container/inversifyContainer';
import { TYPE_REPOSITORY_CONTAINERS } from '@container/repository';
import { TaskSubscribeRepository } from '@infra/database/repository';

export const taskShedulerHandler = async (bot: Telegraf<IBotContext>): Promise<void> => {
  const repository = InversifyContainer.get<TaskSubscribeRepository>(TYPE_REPOSITORY_CONTAINERS.TaskSubscribeRepository);
  const subs = await repository.getdAllByTaskTime(getCurrentDate());
  let operationsCount = 0;

  for (const task of subs) {
    const message = '№' + task.taskEntity.id + `\nЗаголовок: ${task.taskEntity.title}\nОписание: ${task.taskEntity.description}`;
    bot.telegram.sendMessage(task.userID, message);
    operationsCount++;
  }

  Logger.getLogger().info('Рассылку на задачи получило:', operationsCount, 'человек(а)');
};
