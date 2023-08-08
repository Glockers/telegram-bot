import { IBotContext } from '@bot/interfaces/context.interface';
import { getCurrentDate } from '@common/utils/dateUtils';
import { Logger } from '@common/utils/logger';
import { InversifyContainer } from '@container/inversifyContainer';
import { TYPE_REPOSITORY_CONTAINERS } from '@container/repository/repository.type';
import { TaskSubscribeRepository } from '@infra/database/repository/taskSubscribe.repository';
import { Telegraf } from 'telegraf';

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
