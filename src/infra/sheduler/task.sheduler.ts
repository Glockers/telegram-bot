import { IBotContext } from 'bot/context/context.interface';
import { InversifyContainer } from 'container/inversifyContainer';
import { TYPE_REPOSITORY_CONTAINERS } from 'container/repository/repository.type';
import { TaskSubscribeRepository } from 'infra/database/repository/taskSubscribe.repository';
import { Telegraf } from 'telegraf';

export const taskShedulerHandler = async (bot: Telegraf<IBotContext>) => {
  const repository = InversifyContainer.get<TaskSubscribeRepository>(TYPE_REPOSITORY_CONTAINERS.TaskSubscribeRepository);
  console.log(repository);
  // bot.telegram.sendMessage('760175592', 'taskShedulerHandler');
};
