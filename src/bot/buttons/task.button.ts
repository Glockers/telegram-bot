import { Actions } from 'bot/constants/actions.enum';
import { ITaskEntity } from 'infra/database/entities/task.entity';
import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';

export const taskMenu = Markup.inlineKeyboard([
  [
    Markup.button.callback('Мои задачи', Actions.MY_TASK)
  ],
  [
    Markup.button.callback('Добавь задачу', Actions.ADD_TASK)
  ],
  [
    Markup.button.callback('Назад в меню', Actions.HELP_MENU)
  ]
]);

export const backMenuTask = Markup.inlineKeyboard([
  [
    Markup.button.callback('Назад в меню', Actions.TASK)
  ]
]);

export const setTaskPanel = (isSubscribe: boolean, taskID: number): Markup.Markup<InlineKeyboardMarkup> => {
  const serializedTaskInfo = JSON.stringify({ id: taskID });
  const deleteHandlerText = `${Actions.DELETE_TASK}?${serializedTaskInfo}`;
  let selecteTitle = '';
  let subHandlerText = '';
  if (!isSubscribe) {
    selecteTitle = 'Уведомить';
    subHandlerText = `${Actions.SUBSCRIBE_TASK}?${serializedTaskInfo}`;
  } else {
    selecteTitle = 'Отписатся от уведомления';
    subHandlerText = `${Actions.UN_SUBSCRIBE_TASK}?${serializedTaskInfo}`;
  }

  return Markup.inlineKeyboard([
    [Markup.button.callback('Удалить задачу', deleteHandlerText)],
    [Markup.button.callback(selecteTitle, subHandlerText)],
    [Markup.button.callback('Назад в меню', Actions.TASK)]
  ]);
};

export const buttonInfoTask = (tasks: ITaskEntity[]): Markup.Markup<InlineKeyboardMarkup> => {
  const buttonTasks = [];
  for (const element of tasks) {
    const text = 'task_detail?' + JSON.stringify({ id: element.id });
    const title = element.title;
    buttonTasks.push([Markup.button.callback(title, text)]);
  }

  return Markup.inlineKeyboard(buttonTasks);
};
